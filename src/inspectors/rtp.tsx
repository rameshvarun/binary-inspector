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

import * as persist from "../core/persist";
import * as utils from "../core/utils";
import { inspect, PayloadParser, PAYLOAD_PARSERS } from "../decoders/rtp";

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
            {pt} {"->"} {parser.name}
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
