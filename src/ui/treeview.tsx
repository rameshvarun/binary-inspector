import * as React from "react";

import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";

export class TreeView extends React.Component<
  { tree: Tree; onSelect?: (item: Tree) => void },
  {}
> {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  render() {
    let tree = this.props.tree;

    if (tree.children.length > 0) {
      return (
        <details style={{ wordWrap: "break-word" }} open>
          <summary
            onClick={() => {
              if (this.props.onSelect) this.props.onSelect(tree);
            }}
          >
            {tree.label}
          </summary>
          {tree.children.map(t => (
            <div key={t.label} style={{ paddingLeft: "15px" }}>
              <TreeView tree={t} onSelect={this.props.onSelect}></TreeView>
            </div>
          ))}
        </details>
      );
    } else {
      return (
        <div
          onClick={() => {
            if (this.props.onSelect) this.props.onSelect(tree);
          }}
        >
          {tree.label}
        </div>
      );
    }
  }
}
