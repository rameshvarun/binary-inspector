import * as React from "react";
import { Tabs, Tab, Form, Card, FormCheck, FormControl } from "react-bootstrap";

import * as utils from "../core/utils";
import Dropzone from "react-dropzone";

import * as persist from "../core/persist";
import { ElementType } from "react";

export class BinaryInput extends React.Component<{
  inputName: string;
  defaultBase64?: string;
  onBuffer: (buffer: ArrayBuffer) => void;
}> {
  constructor(props) {
    super(props);
  }

  hexIgnoreFirstColumn: React.RefObject<FormCheck<"input">> &
    React.RefObject<HTMLInputElement> = React.createRef();

  hexInput: React.RefObject<FormControl<ElementType<any>>> &
    React.RefObject<HTMLTextAreaElement> = React.createRef();

  onHexChange() {
    // @ts-ignore
    let hex = this.hexInput.current!.value.trim();

    if (this.hexIgnoreFirstColumn.current!.checked) {
      let lines = utils.splitLines(hex);
      lines = lines.map(line =>
        line
          .split(/\s+/g)
          .slice(1)
          .join(" ")
      );
      hex = lines.join("\n");
    }

    let buffer = utils.hexToArrayBuffer(hex);
    this.props.onBuffer(buffer);
  }

  render() {
    return (
      <Tabs
        defaultActiveKey={this.props.defaultBase64 ? "base64" : "hex"}
        id="binary-input-tabs"
      >
        <Tab eventKey="hex" title="Hex">
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows="3"
                ref={this.hexInput}
                onChange={() => this.onHexChange()}
              />
              <Form.Check
                ref={this.hexIgnoreFirstColumn}
                type="checkbox"
                label="Ignore First Column"
                onChange={() => this.onHexChange()}
              />
            </Form.Group>
          </Form>
        </Tab>
        <Tab eventKey="base64" title="Base64">
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows="3"
                onChange={event => {
                  // @ts-ignore
                  let base64 = event.target.value.trim();
                  let buffer = utils.base64ToArrayBuffer(base64);
                  this.props.onBuffer(buffer);
                }}
                defaultValue={this.props.defaultBase64}
              />
            </Form.Group>
          </Form>
        </Tab>
        <Tab eventKey="file" title="File">
          <Form>
            <Dropzone
              onDrop={async files => {
                let file: File = files[0];
                // @ts-ignore
                let buffer = await file.arrayBuffer();
                this.props.onBuffer(buffer);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Text>
                        Drag and drop file here, or click to browse.
                      </Card.Text>
                      <input {...getInputProps()} />
                    </Card.Body>
                  </Card>
                </div>
              )}
            </Dropzone>
          </Form>
        </Tab>
      </Tabs>
    );
  }
}
