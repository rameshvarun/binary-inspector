import * as React from "react";

import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";

import { Row, Col } from "react-bootstrap";

import { BinaryView } from "./binaryview";
import { TreeView } from "./treeview";

export class TreeBinaryView extends React.Component<
  { data: ByteRange; tree: Tree },
  { selected?: Tree }
> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    return (
      <>
        <Row style={{ maxHeight: "600px", marginTop: "10px" }}>
          <Col md={6}>
            <div
              className="border rounded"
              style={{ maxHeight: "600px", overflowY: "scroll" }}
            >
              <TreeView
                tree={this.props.tree}
                selected={this.state.selected}
                onSelect={selected => this.setState({ selected: selected })}
              />
            </div>
          </Col>
          <Col md={6}>

            <BinaryView
              tree={this.props.tree}
              data={this.props.data}
              selected={
                this.state.selected ? this.state.selected.range : undefined
              }
            />
          </Col>
        </Row>
      </>
    );
  }
}
