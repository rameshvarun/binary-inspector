import * as React from "react";
import { Tabs, Tab, Form } from "react-bootstrap";

import * as utils from "../core/utils";

export class BinaryInput extends React.Component<{
  inputName: string;
  onBuffer: (buffer: ArrayBuffer) => void;
}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs defaultActiveKey={window.location.hash ? "base64" : "hex"}>
        <Tab eventKey="hex" title="Hex">
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows="3"
                onChange={event => {
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
                  let base64 = event.target.value.trim();
                  let buffer = utils.base64ToArrayBuffer(base64);
                  this.props.onBuffer(buffer);
                }}
                defaultValue={window.location.hash.substring(1)}
              />
            </Form.Group>
          </Form>
        </Tab>
      </Tabs>
    );
  }
}
