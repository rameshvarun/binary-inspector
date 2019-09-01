import * as ReactDOM from "react-dom";
import * as React from "react";

import { ByteRange, BitRange } from "./range.ts";

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
    <div style={{ fontFamily: "monospace" }}>
      {data.chunks(BYTES_PER_ROW).map((row, i) => (
        <div key={i}>
          {row.chunks(BYTES_PER_GROUP).map((group, i) => (
            <span style={{ paddingRight: "10px" }} key={i}>
              {group.chunks(1).map((byte, i) => (
                <span style={{ paddingRight: "5px" }} key={i}>
                  {byte.toHex()}
                </span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export class Inspector extends React.Component<
  { inspect: (range: ByteRange) => Tree },
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
    let tree = this.props.inspect(data);

    this.setState({ data: data, tree: tree });
  }

  render() {
    return (
      <>
        <BinaryInput onBuffer={buffer => this.loadBuffer(buffer)} />
        {this.state ? (
          <>
            <Row>
              <Col>
                <TreeView tree={this.state.tree} />
              </Col>
              <Col>
                <BinaryView data={this.state.data} />
              </Col>
            </Row>
          </>
        ) : (
          <div>No data provided yet.</div>
        )}
      </>
    );
  }
}
