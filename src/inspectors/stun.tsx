import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";
import { Container } from "react-bootstrap";

const ATTRIBUTE_PARSERS = new Map();

function inspect(range: ByteRange): Tree {
  let msgType = range.bits(2, 14);
  let msgLength = range.bytes(2, 2);
  let magicCookie = range.bytes(4, 4);
  let transactionID = range.bytes(8, 12);

  return new Tree(`STUN Packet`, range, [
    new Tree(`Message Type: ${msgType.readUIntBE()}`, msgType),
    new Tree(`Message Length: ${msgLength.readUIntBE()}`, msgLength),
    new Tree(`Magic Cookie: ${magicCookie.toHex()}`, magicCookie),
    new Tree(`Transaction ID: ${transactionID.toHex()}`, transactionID)
  ]);
}

ReactDOM.render(
  <Container>
    <div className="page-header">
      <h1>STUN Packet Inspector</h1>
      Based off <a href="https://tools.ietf.org/html/rfc5389">RFC 5389</a>.
      <hr />
    </div>
    <SimpleInspector inspect={inspect} />
  </Container>,
  document.getElementById("root")
);
