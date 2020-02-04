import * as React from "react";

import { ByteRange } from "../core/range";
import { Tree } from "../core/tree";

import { Row, Col } from "react-bootstrap";
import * as utils from "../core/utils";

import { BinaryInput } from "./binaryinput";
import { TreeBinaryView } from "./treebinaryview";

type SimpleInspectorState =
  | { kind: "noData" }
  | { kind: "hasData"; data: ByteRange; tree: Tree };

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

    this.setState({ kind: "hasData", data: data, tree: tree });
  }

  render() {
    return (
      <>
        <BinaryInput
          inputName="input"
          onBuffer={buffer => this.loadBuffer(buffer)}
        />
        {this.state.kind == "hasData" ? (
          <TreeBinaryView tree={this.state.tree} data={this.state.data} />
        ) : (
          <div>No data provided yet.</div>
        )}
      </>
    );
  }
}
