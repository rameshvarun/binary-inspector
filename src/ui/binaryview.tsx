import * as React from "react";

import { ByteRange, BitRange } from "../core/range";

const BYTES_PER_ROW = 16;
const BYTES_PER_GROUP = 8;

export class BinaryView extends React.Component<
  { data: ByteRange; selected?: ByteRange | BitRange },
  {}
> {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;

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
