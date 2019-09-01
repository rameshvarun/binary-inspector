import { ByteRange, BitRange } from "./range.ts";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { assert } from "chai";

enum Mode {
  SILK_ONLY = "SILK-only",
  HYBRID = "Hybrid",
  CELT_ONLY = "CELT-only"
}

enum Bandwidth {
  NB = "NB",
  MB = "MB",
  WB = "WB",
  SWB = "SWB",
  FB = "FB"
}

function getSampleRate(bandwidth: Bandwidth): number {
  switch (bandwidth) {
    case Bandwidth.NB:
      return 8000;
    case Bandwidth.MB:
      return 12000;
    case Bandwidth.WB:
      return 16000;
    case Bandwidth.SWB:
      return 24000;
    case Bandwidth.FB:
      return 48000;
  }
}

function getBandwidth(bandwidth: Bandwidth): number {
  switch (bandwidth) {
    case Bandwidth.NB:
      return 4000;
    case Bandwidth.MB:
      return 6000;
    case Bandwidth.WB:
      return 8000;
    case Bandwidth.SWB:
      return 12000;
    case Bandwidth.FB:
      return 20000;
  }
}

const SILK_ONLY_FRAME_SIZES = [10, 20, 40, 60];
const HYBRID_FRAME_SIZES = [10, 20];
const CELT_ONLY_FRAME_SIZES = [2.5, 5, 10, 20];

function parseConfig(config) {
  if (config <= 3) {
    return [Mode.SILK_ONLY, Bandwidth.NB, SILK_ONLY_FRAME_SIZES[config]];
  } else if (config <= 7) {
    return [Mode.SILK_ONLY, Bandwidth.MB, SILK_ONLY_FRAME_SIZES[config - 4]];
  } else if (config <= 11) {
    return [Mode.SILK_ONLY, Bandwidth.WB, SILK_ONLY_FRAME_SIZES[config - 8]];
  } else if (config <= 13) {
    return [Mode.HYBRID, Bandwidth.SWB, HYBRID_FRAME_SIZES[config - 12]];
  } else if (config <= 15) {
    return [Mode.HYBRID, Bandwidth.FB, HYBRID_FRAME_SIZES[config - 14]];
  } else if (config <= 19) {
    return [Mode.CELT_ONLY, Bandwidth.NB, CELT_ONLY_FRAME_SIZES[config - 16]];
  } else if (config <= 23) {
    return [Mode.CELT_ONLY, Bandwidth.WB, CELT_ONLY_FRAME_SIZES[config - 20]];
  } else if (config <= 27) {
    return [Mode.CELT_ONLY, Bandwidth.SWB, CELT_ONLY_FRAME_SIZES[config - 24]];
  } else if (config <= 31) {
    return [Mode.CELT_ONLY, Bandwidth.FB, CELT_ONLY_FRAME_SIZES[config - 28]];
  } else {
    throw new Error(`Unknown config ${config}.`);
  }
}

class Tree {
  label: string;
  range: ByteRange | BitRange;
  children: Array<Tree>;

  constructor(
    label: string,
    range: ByteRange | BitRange,
    children: Array<Tree> = []
  ): range {
    this.label = label;
    this.range = range;
    this.children = children;
  }
}

function inspectConfig(config: BitRange): Tree {
  let [mode, bw, fs] = parseConfig(config.readUIntBE());
  return new Tree(
    `Config: ${config.readUIntBE()} (${mode}, ${bw}, ${fs}ms)`,
    config,
    [
      new Tree(`Mode: ${mode}`, config),
      new Tree(
        `Bandwidth: ${bw} (${getBandwidth(bw)}Hz), Sample Rate: ${getSampleRate(
          bw
        )}Hz`,
        config
      ),
      new Tree(`Frame Size: ${fs}ms`, config)
    ]
  );
}

function inspectFrame(range: ByteRange): Tree {
  return new Tree(`Compressed Frame`, range, []);
}

function inspectFrames(c: number, range: ByteRange): Tree {
  let frames = [];
  if (c == 0) {
    frames = [inspectFrame(range)];
  } else if (c == 1) {
    assert(range.byteLength % 2 == 0);
    frames = [
      inspectFrame(range.bytes(0, byteLength / 2)),
      inspectFrame(range.bytes(byteLength / 2))
    ];
  }

  return new Tree(`Compressed Frames`, range, frames);
}

function inspect(range: ByteRange): Tree {
  let toc = range.bytes(0, 1);
  let config = toc.bits(0, 5);
  let s = toc.bits(5, 1);
  let c = toc.bits(6, 2);

  let packingCodes = [
    "1 Frame",
    "2 Frame, Equal Size",
    "2 Frames, Different Size",
    "Arbitrary Frames"
  ];

  return new Tree(`Opus Packet`, range, [
    inspectConfig(config),
    new Tree(`Channels: ${s.readBool() ? "Stereo" : "Mono"}`, s),
    new Tree(
      `Frame Packing Mode: ${c.readUIntBE()} (${packingCodes[c.readUIntBE()]})`,
      c
    ),
    inspectFrames(c.readUIntBE(), range.bytes(1))
  ]);
}

import { Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import * as utils from "./utils";

const BinaryInput = props => {
  return (
    <Tabs defaultActiveKey={window.location.hash ? "base64" : "hex"}>
      <Tab eventKey="hex" title="Hex">
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              onChange={event => {
                let hex = event.target.value.trim();
                let buffer = utils.hexToArrayBuffer(hex);
                props.onBuffer(buffer);
              }}
            />
          </Form.Group>
        </Form>
      </Tab>
      <Tab eventKey="base64" title="Base64">
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              onChange={event => {
                let base64 = event.target.value.trim();
                let buffer = utils.base64ToArrayBuffer(base64);
                props.onBuffer(buffer);
              }}
              defaultValue={window.location.hash.substring(1)}
            />
          </Form.Group>
        </Form>
      </Tab>
    </Tabs>
  );
};

const TreeView = ({ tree }) => {
  if (tree.children.length > 0) {
    return (
      <details open>
        <summary>{tree.label}</summary>
        {tree.children.map(t => (
          <div key={t.label} style={{ paddingLeft: "15px" }}>
            <TreeView tree={t}></TreeView>
          </div>
        ))}
      </details>
    );
  } else {
    return tree.label;
  }
};

const BYTES_PER_ROW = 16;
const BYTES_PER_GROUP = 8;
const BinaryView = ({ data }) => {
  return (
    <div style={{fontFamily: "monospace"}}>
      {data.chunks(BYTES_PER_ROW).map((row, i) => (
        <div key={i}>
          {row.chunks(BYTES_PER_GROUP).map((group, i) => (
            <span style={{paddingRight: "10px"}} key={i}>
              {group.chunks(1).map((byte, i) => (
                <span style={{paddingRight: "5px"}} key={i}>{byte.toHex()}</span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

class Inspector extends React.Component<
  {},
  null | { data: ByteRange; tree: Tree }
> {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    if (window.location.hash) {
      let base64 = window.location.hash.substring(1).trim();
      let buffer = utils.base64ToArrayBuffer(base64);
      this.loadBuffer(buffer);
    }
  }

  loadBuffer(buffer) {
    window.location.hash = utils.arrayBufferToBase64(buffer);

    let data = new ByteRange(buffer, 0, buffer.byteLength);
    let tree = inspect(data);

    this.setState({ data: data, tree: tree });
  }

  render() {
    return (
      <>
        <BinaryInput onBuffer={buffer => this.loadBuffer(buffer)} />
        {this.state ? (
          <>
            <Row><Col><TreeView tree={this.state.tree} /></Col>
            <Col><BinaryView data={this.state.data} /></Col></Row>
          </>
        ) : (
          <div>No data provided yet.</div>
        )}
      </>
    );
  }
}

ReactDOM.render(<Inspector />, document.getElementById("root"));
