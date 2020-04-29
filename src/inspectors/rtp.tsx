import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";
import { BinaryInput } from "../ui/binaryinput";
import { BinaryView } from "../ui/binaryview";
import { TreeView } from "../ui/treeview";
import { TreeBinaryView } from "../ui/treebinaryview";

import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  FormControl
} from "react-bootstrap";

import * as opus from "../decoders/opus";
import * as vp8 from "../decoders/vp8-rtp";
import * as red from "../decoders/red";
import * as ulpfec from "../decoders/ulpfec";

import * as persist from "../core/persist";
import * as utils from "../core/utils";

const HEADER_EXTENSION_PARSERS = new Map();

export type PayloadParser = {
  name: string;
  id: string;
  inspect: (range: ByteRange, payloadTypes: Map<number, PayloadParser>) => Tree;
  defaultPT: number;
};

const PAYLOAD_PARSERS: Array<PayloadParser> = [
  {
    name: "Opus (RFC 7587)",
    id: "opus",
    inspect: opus.inspect,
    defaultPT: 111
  },
  {
    name: "RED (RFC 2198)",
    id: "red",
    inspect: red.inspect,
    defaultPT: 108
  },
  {
    name: "VP8 (RFC 7741)",
    id: "vp8",
    inspect: vp8.inspect,
    defaultPT: 96
  },
  {
    name: "ULPFEC (RFC 5109)",
    id: "ulpfec",
    inspect: ulpfec.inspect,
    defaultPT: 124
  }
];

function inspectOneByteHeaderExtensions(range: ByteRange) {
  let headers: Array<Tree> = [];

  let ptr = range;
  while (ptr.size() > 0) {
    let header = ptr.bytes(0, 1);
    if (header.readUIntBE() == 0) {
      ptr = ptr.bytes(1);
      continue;
    }

    let id = header.bits(0, 4);
    let len = header.bits(4, 4);

    console.log(id.readUIntBE());
    console.log(len.readUIntBE());

    let dataLength = len.readUIntBE() + 1;
    let data = ptr.bytes(1, dataLength);
    headers.push(
      new Tree(`Header`, ptr.bytes(0, 1 + dataLength), [
        new Tree(`ID: ${id.readUIntBE()}`, id),
        new Tree(`Length: ${len.readUIntBE()} (${dataLength} bytes)`, len),
        new Tree(`Data: ${data.toHex()}`, data)
      ])
    );

    ptr = ptr.bytes(1 + dataLength);
  }

  return new Tree(`Headers`, range, headers);
}

function inspect(
  range: ByteRange,
  payloadTypes: Map<number, PayloadParser>
): Tree {
  let packetRange = range;

  let v = range.bits(0, 2);
  let p = range.bits(2, 1);
  let x = range.bits(3, 1);
  let cc = range.bits(4, 4);

  let m = range.bits(8, 1);
  let pt = range.bits(9, 7);

  let seq = range.bytes(2, 2);
  let timestamp = range.bytes(4, 4);
  let ssrc = range.bytes(8, 4);

  let elements = [
    new Tree(`Version: ${v.readUIntBE()}`, v),
    new Tree(`Padding: ${p.readBool()}`, p),
    new Tree(`Extension: ${x.readBool()}`, x),
    new Tree(`CSRC count: ${cc.readUIntBE()}`, cc),
    new Tree(`Marker: ${m.readBool()}`, m),
    new Tree(`Payload Type: ${pt.readUIntBE()}`, pt),

    new Tree(`Sequence Number: ${seq.readUIntBE()}`, seq),
    new Tree(`Timestamp: ${timestamp.readUIntBE()}`, timestamp),
    new Tree(`SSRC: ${ssrc.readUIntBE()}`, ssrc)
  ];

  if (p.readBool() || cc.readUIntBE() > 0) assert.fail("Unimplemented.");

  // Advange range past header.
  range = range.bytes(12);

  if (x.readBool()) {
    let profile = range.bytes(0, 2);
    let length = range.bytes(2, 2);

    let lengthBytes = length.readUIntBE() * 4;
    let headerData = range.bytes(4, lengthBytes);

    elements.push(
      new Tree(`Defined By Profile: 0x${profile.toHex()}`, profile)
    );
    elements.push(
      new Tree(
        `Header Length: ${length.readUIntBE()} (${lengthBytes} bytes)`,
        length
      )
    );

    if (profile.readUIntBE() == 48862) {
      elements.push(inspectOneByteHeaderExtensions(headerData));
    } else {
      elements.push(new Tree(`Header Data: ${headerData.toHex()}`, headerData));
    }

    range = range.bytes(4 + lengthBytes);
  }

  let payloadType = pt.readUIntBE();
  let payload = range;

  if (payloadTypes.has(payloadType)) {
    let parser = payloadTypes.get(payloadType)!;
    let payloadTree = parser.inspect(payload, payloadTypes);
    elements.push(new Tree(`Payload: ${parser.name}`, payload, [payloadTree]));
  } else {
    elements.push(new Tree(`Payload: ${utils.hexEllipsis(payload)}`, payload));
  }

  return new Tree(`RTP Packet`, packetRange, elements);
}

type RTPInspectorState =
  | { kind: "noData"; payloadParsers: Map<number, PayloadParser> }
  | {
      kind: "decodeSuccess";
      payloadParsers: Map<number, PayloadParser>;
      data: ByteRange;
      tree: Tree;
    }
  | {
      kind: "decodeFailure";
      payloadParsers: Map<number, PayloadParser>;
      data: ByteRange;
      error: Error;
    };

class RTPInspector extends React.Component<{}, RTPInspectorState> {
  constructor(props) {
    super(props);

    let payloadParsers = new Map();
    for (let parser of PAYLOAD_PARSERS) {
      payloadParsers.set(parser.defaultPT, parser);
    }

    this.state = {
      kind: "noData",
      payloadParsers: payloadParsers
    };
  }

  componentDidMount() {
    if (persist.has("data")) {
      let base64 = persist.get("data")!;
      let buffer = utils.base64ToArrayBuffer(base64);
      this.loadBuffer(buffer);
    }
  }

  loadBuffer(buffer) {
    persist.set("data", utils.arrayBufferToBase64(buffer));

    let data = new ByteRange(buffer, 0, buffer.byteLength);
    try {
      let tree = inspect(data, this.state.payloadParsers);
      this.setState({
        kind: "decodeSuccess",
        data: data,
        tree: tree,
        payloadParsers: this.state.payloadParsers
      });
    } catch (e) {
      this.setState({
        kind: "decodeFailure",
        data: data,
        error: e,
        payloadParsers: this.state.payloadParsers
      });
    }
  }

  payloadTypeRef: React.RefObject<
    FormControl<"input"> & HTMLInputElement
  > = React.createRef();
  payloadParserRef: React.RefObject<
    FormControl<"select"> & HTMLSelectElement
  > = React.createRef();

  render() {
    return (
      <>
        <h2>RTP Packet</h2>
        <BinaryInput
          inputName="input"
          defaultBase64={persist.get("data")}
          onBuffer={buffer => this.loadBuffer(buffer)}
        />
        <h2>Payload Type Mappings</h2>

        {Array.from(this.state.payloadParsers.entries()).map(([pt, parser]) => (
          <div>
            {pt} -> {parser.name}
          </div>
        ))}

        <Form>
          <Form.Group controlId="masterKey">
            <Form.Control
              type="number"
              placeholder="Enter the payload type number."
              ref={this.payloadTypeRef}
            />
            <Form.Control as="select" ref={this.payloadParserRef}>
              {PAYLOAD_PARSERS.map((parser, i) => (
                <option value={i}>{parser.name}</option>
              ))}
            </Form.Control>
            <Button
              variant="primary"
              onClick={() => {
                this.setState(state => {
                  if (this.payloadTypeRef.current!.value) {
                    let pt = parseInt(this.payloadTypeRef.current!.value, 10);
                    let parser =
                      PAYLOAD_PARSERS[
                        parseInt(this.payloadParserRef.current!.value)
                      ];
                    state.payloadParsers.set(pt, parser);
                  }
                  return state;
                });
              }}
            >
              Set Mapping
            </Button>
          </Form.Group>
        </Form>

        {this.state.kind == "decodeSuccess" && (
          <TreeBinaryView tree={this.state.tree} data={this.state.data} />
        )}
        {this.state.kind == "decodeFailure" && (
          <Row>
            <Col md={6}>
              <Alert variant="danger">
                <Alert.Heading>{this.state.error.toString()}</Alert.Heading>
                <code>
                  <pre>{this.state.error.stack}</pre>
                </code>
              </Alert>
            </Col>
            <Col md={6}>
              <BinaryView data={this.state.data} />
            </Col>
          </Row>
        )}
        {this.state.kind == "noData" && <div>No data provided yet.</div>}
      </>
    );
  }
}

ReactDOM.render(<RTPInspector />, document.getElementById("root"));
