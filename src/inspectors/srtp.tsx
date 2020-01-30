import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { Form } from "react-bootstrap";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BinaryInput } from "../ui/binaryinput";
import * as utils from "../core/utils";

const k_e = 0;
const k_a = 1;
const k_s = 2;

type CipherSuite = {
  masterKeyLength: number;
  masterSaltLength: number;
  srtpAuthTagLength: number;
};

const AES_CM_128_HMAC_SHA1_32: CipherSuite = {
  masterKeyLength: 16,
  masterSaltLength: 14,
  srtpAuthTagLength: 4
};

function inspect(range: ByteRange): Tree {
  const cipherSuite = AES_CM_128_HMAC_SHA1_32;

  const auth = range.bytes(range.byteLength - cipherSuite.srtpAuthTagLength);
  console.log(auth.toHex());

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

  componentDidMount() {
    if (window.location.hash) {
      let base64 = window.location.hash.substring(1).trim();
      let buffer = utils.base64ToArrayBuffer(base64);
      this.loadBuffer(buffer);
    }
  }

  loadBuffer(buffer) {
    window.location.hash = utils.arrayBufferToBase64(buffer);

    let data = new ByteRange(buffer, 0, buffer.byteLength);
    let tree = inspect(data);
  }

  render() {
    return (
      <>
        <BinaryInput
          inputName="input"
          onBuffer={buffer => this.loadBuffer(buffer)}
        />

        <Form>
          <Form.Group controlId="masterKey">
            <Form.Label>Master Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cipher suite master key."
            />
          </Form.Group>
        </Form>
      </>
    );
  }
}

// export function entry() {
//   ReactDOM.render(<SRTPInspector />, document.getElementById("root"));
// }
