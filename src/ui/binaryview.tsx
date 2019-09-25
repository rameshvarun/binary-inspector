import * as React from "react";

const BYTES_PER_ROW = 16;
const BYTES_PER_GROUP = 8;

export const BinaryView = ({ data }) => {
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
