import * as React from "react";

export const TreeView = ({ tree }) => {
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
