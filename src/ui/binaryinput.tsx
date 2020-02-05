import * as React from "react";
import { Tabs, Tab, Form, Card } from "react-bootstrap";

import * as utils from "../core/utils";
import Dropzone from "react-dropzone";

import * as persist from "../core/persist";

export class BinaryInput extends React.Component<{
  inputName: string;
  defaultBase64?: string;
  onBuffer: (buffer: ArrayBuffer) => void;
}> {
  constructor(props) {
    super(props);
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
                onChange={event => {
                  // @ts-ignore
                  let hex = event.target.value.trim();
                  let buffer = utils.hexToArrayBuffer(hex);
                  this.props.onBuffer(buffer);
                }}
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
