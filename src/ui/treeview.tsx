import * as React from "react";

import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";

const ERROR_BACKGROUND_COLOR = "#ff6e6e";

export class TreeView extends React.Component<
  { tree: Tree; selected?: Tree; onSelect?: (item: Tree) => void },
  {}
> {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  render() {
    let tree = this.props.tree;

    let backgroundColor = "";
    if (tree.error) {
      backgroundColor = ERROR_BACKGROUND_COLOR;
    }
    if (this.props.selected == tree) {
      backgroundColor = "#dedede";
    }

    if (tree.children.length > 0) {
      return (
        <details
          style={{
            wordWrap: "break-word",
            backgroundColor: backgroundColor,
            paddingLeft: "5px"
          }}
          open
        >
          <summary
            onClick={() => {
              if (this.props.onSelect) this.props.onSelect(tree);
            }}
          >
            {tree.label}
          </summary>

          {tree.children.map((t, i) => (
            <div key={i} style={{ paddingLeft: "15px" }}>
              <TreeView
                tree={t}
                onSelect={this.props.onSelect}
                selected={this.props.selected}
              ></TreeView>
            </div>
          ))}
        </details>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor,
            paddingLeft: "5px"
          }}
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
