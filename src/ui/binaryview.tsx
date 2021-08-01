import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";

import { ByteRange, BitRange } from "../core/range";

const HEX_BYTES_PER_ROW = 16;
const HEX_BYTES_PER_GROUP = 8;

const BINARY_BYTES_PER_ROW = 8;
const BINARY_BYTES_PER_GROUP = 4;

const MAX_ROWS = 1000;

const SELECTED_COLOR = "#dedede";

type Format = "hex" | "binary";

export class BinaryView extends React.Component<
  { data: ByteRange; selected?: ByteRange | BitRange },
  { format: Format }
> {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
  }

  setFormat(format: Format) {
    this.setState({ format: format });
  }

  render() {
    return (
      <>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Format
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={this.state.format}
                onChange={e => {
                  // @ts-ignore
                  this.setFormat(e.target.value);
                }}
              >
                <option value="hex">Hex</option>
                <option value="binary">Binary</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
        {this.state.format === "hex" && this.renderHex()}
        {this.state.format === "binary" && this.renderBinary()}
      </>
    );
  }

  renderHex() {
    let data = this.props.data;

    // let totalRows = Math.ceil(data.byteLength / HEX_BYTES_PER_ROW);

    // let rowStart = 0;
    // let rowEnd = Math.ceil(data.byteLength / HEX_BYTES_PER_ROW);

    // const MAX_ROWS = 2;
    // if (totalRows > MAX_ROWS) {
    //   if (this.props.selected) {
    //   } else {
    //     rowStart = 1;
    //     rowEnd = MAX_ROWS;
    //   }
    // }

    // data = data.bytes(rowStart * HEX_BYTES_PER_ROW,);

    return (
      <>
        {/* {(rowStart > 0) ? <div>{rowStart} rows above...</div> : null} */}
        <div
          style={{
            fontFamily: "monospace",
            overflowX: "scroll",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <span
            style={{
              borderColor: "black",
              borderRight: "1px solid",
              paddingRight: "5px",
              paddingLeft: "5px",
              marginRight: "10px"
            }}
          >
            {data.chunks(HEX_BYTES_PER_ROW).map((row, i) => (
              <div key={i}>
                <span style={{}}>
                  {row.byteStart.toString(16).padStart(8, "0")}
                </span>
              </div>
            ))}
          </span>
          <span>
            {data.chunks(HEX_BYTES_PER_ROW).map((row, i) => (
              <div key={i}>
                {row.chunks(HEX_BYTES_PER_GROUP).map((group, i) => (
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
                            backgroundColor: selected ? SELECTED_COLOR : ""
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
          </span>
        </div>
        {/* {(rowEnd < totalRows) ? <div>{totalRows - rowEnd} rows below...</div> : null} */}
      </>
    );
  }

  renderBinary() {
    let data = this.props.data;
    if (data.byteLength > MAX_ROWS * BINARY_BYTES_PER_ROW)
      return <div>File is too large for binary view.</div>;

    return (
      <div style={{ fontFamily: "monospace" }}>
        {data.chunks(BINARY_BYTES_PER_ROW).map((row, i) => (
          <div key={i}>
            {row.chunks(BINARY_BYTES_PER_GROUP).map((group, i) => (
              <span style={{ paddingRight: "10px" }} key={i}>
                {group.chunks(1).map((byte, i) => {
                  return (
                    <span
                      style={{
                        paddingRight: "5px"
                      }}
                      key={i}
                    >
                      {byte
                        .bits(0)
                        .chunks(1)
                        .map((b, i) => {
                          let selected = false;
                          if (this.props.selected) {
                            if (this.props.selected instanceof ByteRange) {
                              selected = this.props.selected.contains(
                                b.enclosingByteRange()
                              );
                            } else if (
                              this.props.selected instanceof BitRange
                            ) {
                              selected = this.props.selected.contains(b);
                            }
                          }
                          return (
                            <span
                              style={{
                                backgroundColor: selected ? SELECTED_COLOR : ""
                              }}
                              key={i}
                            >
                              {b.readBool() ? "1" : "0"}
                            </span>
                          );
                        })}
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
