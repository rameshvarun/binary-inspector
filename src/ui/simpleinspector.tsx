import * as React from "react";

import { ByteRange } from "../core/range";
import { Tree } from "../core/tree";

import { Row, Col, Alert } from "react-bootstrap";
import * as utils from "../core/utils";

import { BinaryInput } from "./binaryinput";
import { TreeBinaryView } from "./treebinaryview";

import { BinaryView } from "./binaryview";

import * as persist from "../core/persist";

type SimpleInspectorState =
  | { kind: "noData" }
  | { kind: "decodeSuccess"; data: ByteRange; tree: Tree }
  | { kind: "decodeFailure"; data: ByteRange; error: Error };

/**
 * This widget constructs a basic inspector with a BinaryInput, a TreeView,
 * and a BinaryView, similar to what you would see in Wireshark. Other inspectors
 * may be more complicated and have additional inputs or views.
 */
export class SimpleInspector extends React.Component<
  { inspect: (range: ByteRange) => Tree },
  SimpleInspectorState
> {
  constructor(props) {
    super(props);
    this.state = { kind: "noData" };
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
      let tree = this.props.inspect(data);
      this.setState({ kind: "decodeSuccess", data: data, tree: tree });
    } catch (e) {
      this.setState({ kind: "decodeFailure", data: data, error: e });
    }
  }

  render() {
    return (
      <>
        <BinaryInput
          inputName="input"
          defaultBase64={persist.get("data")}
          onBuffer={buffer => this.loadBuffer(buffer)}
        />
        {this.state.kind == "decodeSuccess" && (
          <TreeBinaryView tree={this.state.tree} data={this.state.data} />
        )}

        {this.state.kind == "decodeFailure" && (
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>{this.state.error.toString()}</Alert.Heading>
                <code>
                  <pre>{this.state.error.stack}</pre>
                </code>
              </Alert>
            </Col>
            <Col>
              <BinaryView data={this.state.data} />
            </Col>
          </Row>
        )}

        {this.state.kind == "noData" && <div>No data provided yet.</div>}
      </>
    );
  }
}
