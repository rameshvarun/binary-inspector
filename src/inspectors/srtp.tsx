import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { Form } from "react-bootstrap";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BinaryInput } from "../ui/binaryinput";

function inspect(range: ByteRange, cipherSuite): Tree {
  return new Tree(`SRTP Packet`, range);
}

/**
 * An inspector for SRTP packets that allows the user to specify decryption
 * keys and cipher suites for individual SSRCs. ROC is assumed to be 0.
 */
class SRTPInspector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <>
      <BinaryInput
        inputName="input"
        onBuffer={buffer => {}}
      />

      <Form>
      <Form.Group controlId="masterKey">
        <Form.Label>Master Key</Form.Label>
        <Form.Control type="text" placeholder="Enter cipher suite master key." />
      </Form.Group>
    </Form></>;
  }
}

export function entry() {
  ReactDOM.render(<SRTPInspector />, document.getElementById("root"));
}
