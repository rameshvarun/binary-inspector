import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";

import { ByteRange, BitRange } from "../core/range";

const HEX_BYTES_PER_ROW = 16;
const HEX_BYTES_PER_GROUP = 8;

const BINARY_BYTES_PER_ROW = 8;
const BINARY_BYTES_PER_GROUP = 4;

const DEFAULT_MAX_ROWS = 1000;

const SELECTED_COLOR = "#dedede";

type Format = "hex" | "binary";

export class BinaryView extends React.Component<
  { data: ByteRange; selected?: ByteRange | BitRange; maxRows: number },
  { format: Format }
> {
  static defaultProps = {
    maxRows: DEFAULT_MAX_ROWS
  };

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

    // The total number of rows required to render the data.
    let totalRows = Math.ceil(data.byteLength / HEX_BYTES_PER_ROW);

    // The rows that we are rendering. If the data is small, this is all the rows.
    let rowStart = 0;
    let rowEnd = Math.ceil(data.byteLength / HEX_BYTES_PER_ROW);

    if (totalRows > this.props.maxRows) {
      if (this.props.selected) {
        const byteStart =
          this.props.selected instanceof ByteRange
            ? this.props.selected.byteStart
            : this.props.selected.enclosingByteRange().byteStart;
        const selectionRow = Math.floor(byteStart / HEX_BYTES_PER_ROW);

        rowStart = Math.max(
          0,
          selectionRow - Math.floor((this.props.maxRows - 1) / 2)
        );
        rowEnd = rowStart + this.props.maxRows;
      } else {
        rowStart = 0;
        rowEnd = rowStart + this.props.maxRows;
      }
    }

    const bytesLeft = data.byteLength - rowStart * HEX_BYTES_PER_ROW;
    data = data.bytes(
      rowStart * HEX_BYTES_PER_ROW,
      Math.min(bytesLeft, (rowEnd - rowStart) * HEX_BYTES_PER_ROW)
    );

    return (
      <>
        {rowStart > 0 ? <div>{rowStart} rows above...</div> : null}
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
        {rowEnd < totalRows ? (
          <div>{totalRows - rowEnd} rows below...</div>
        ) : null}
      </>
    );
  }

  renderBinary() {
    let data = this.props.data;
    if (data.byteLength > this.props.maxRows * BINARY_BYTES_PER_ROW)
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
