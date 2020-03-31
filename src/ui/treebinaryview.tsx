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
        <Row>
          <Col md={6}>
            <TreeView
              tree={this.props.tree}
              selected={this.state.selected}
              onSelect={selected => this.setState({ selected: selected })}
            />
          </Col>
          <Col md={6}>
            <BinaryView
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
