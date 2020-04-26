import * as React from "react";

import { ByteRange, BitRange } from "../core/range";

const BYTES_PER_ROW = 16;
const BYTES_PER_GROUP = 8;

const MAX_ROWS = 1000;

export class BinaryView extends React.Component<
  { data: ByteRange; selected?: ByteRange | BitRange },
  {}
> {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    if (data.byteLength > MAX_ROWS * BYTES_PER_ROW)
      return <div>File is too large for binary view.</div>;

    return (
      <div style={{ fontFamily: "monospace" }}>
        {data.chunks(BYTES_PER_ROW).map((row, i) => (
          <div key={i}>
            {row.chunks(BYTES_PER_GROUP).map((group, i) => (
              <span style={{ paddingRight: "10px" }} key={i}>
                {group.chunks(1).map((byte, i) => {
                  let selected = false;
                  if (this.props.selected) {
                    if (this.props.selected instanceof ByteRange) {
                      selected = this.props.selected.contains(byte);
                    } else if (this.props.selected instanceof BitRange) {
                      selected = this.props.selected
                        .enclosingByteRange()
                        .contains(byte);
                    }
                  }

                  return (
                    <span
                      style={{
                        paddingRight: "5px",
                        backgroundColor: selected ? "#dedede" : ""
                      }}
                      key={i}
                    >
                      {byte.toHex()}
                    </span>
                  );
                })}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
