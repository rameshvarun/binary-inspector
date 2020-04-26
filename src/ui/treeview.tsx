import * as React from "react";

import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const ERROR_BACKGROUND_COLOR = "#ff6e6e";

export class TreeView extends React.Component<
  {
    depth: number;
    tree: Tree;
    selected?: Tree;
    onSelect?: (item: Tree) => void;
  },
  {
    open: boolean;
  }
> {
  public static defaultProps = {
    depth: 0
  };

  constructor(props) {
    super(props);

    this.state = { open: this.props.depth <= 1 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selected != nextProps.selected) {
      let isBeingDeselected =
        !!this.props.selected &&
        this.props.tree.isParentOf(this.props.selected);
      let isBeingSelected =
        !!nextProps.selected && this.props.tree.isParentOf(nextProps.selected);

      if (isBeingDeselected || isBeingSelected) return true;
    }
    if (this.state.open !== nextState.open) return true;
    return false;
  }

  render() {
    let tree = this.props.tree;
    let depth = this.props.depth || 0;

    let backgroundColor = "";
    if (tree.error) {
      backgroundColor = ERROR_BACKGROUND_COLOR;
    }
    if (this.props.selected == tree) {
      backgroundColor = "#dedede";
    }

    if (tree.children.length > 0) {
      return (
        <div
          style={{
            wordWrap: "break-word",
            backgroundColor: backgroundColor,
            paddingLeft: "5px"
          }}
        >
          <div
            onClick={() => {
              if (this.props.onSelect) this.props.onSelect(tree);
            }}
          >
            <span
              onClick={e => {
                this.setState(state => {
                  return { ...state, open: !state.open };
                });
                e.stopPropagation();
              }}
              style={{ paddingRight: "5px" }}
            >
              <FontAwesomeIcon
                icon={this.state.open ? faCaretDown : faCaretRight}
              />
            </span>
            <span>{tree.label}</span>
          </div>

          {this.state.open &&
            tree.children.map((t, i) => (
              <div key={i} style={{ paddingLeft: "15px" }}>
                <TreeView
                  tree={t}
                  depth={depth + 1}
                  onSelect={this.props.onSelect}
                  selected={this.props.selected}
                ></TreeView>
              </div>
            ))}
        </div>
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
