import * as React from "react";

import { ByteRange } from "../core/range";
import { Tree } from "../core/tree";

import { Row, Col } from "react-bootstrap";
import * as utils from "../core/utils";

import { BinaryInput } from "./binaryinput";
import { BinaryView } from "./binaryview";
import { TreeView } from "./treeview";

type SimpleInspectorState =
  | { kind: "noData" }
  | { kind: "hasData"; data: ByteRange; tree: Tree; selected: null | Tree };

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
          <>
            <Row>
              <Col>
                <TreeView
                  tree={this.state.tree}
                  onSelect={selected => {
                    if (this.state.kind == "hasData") {
                      this.setState({ kind: "hasData", selected: selected });
                    }
                  }}
                />
              </Col>
              <Col>
                <BinaryView
                  data={this.state.data}
                  selected={
                    this.state.selected ? this.state.selected.range : undefined
                  }
                />
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