import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";
import { Container } from "react-bootstrap";

type AttributeParser = {
  name: string;
  parse: (value: ByteRange) => Array<Tree>;
};

const ATTRIBUTE_PARSERS = new Map<number, AttributeParser>();
ATTRIBUTE_PARSERS.set(0x0001, {
  name: "MAPPED-ADDRESS",
  parse: (value: ByteRange) => {
    let family = value.bytes(1, 1);
    let port = value.bytes(2, 2);

    // TODO: Actually decode the IP addresses.

    let familyName = "UNKNOWN";
    switch (family.readUIntBE()) {
      case 1:
        familyName = "IPv4";
        break;
      case 2:
        familyName = "IPv6";
        break;
    }
    return [
      new Tree(`Family: ${familyName} (0x${family.toHex()})`, family),
      new Tree(`Port: ${port.readUIntBE()}`, port)
    ];
  }
});

ATTRIBUTE_PARSERS.set(0x0006, {
  name: "USERNAME",
  parse: (value: ByteRange) => {
    return [new Tree(`Username: ${value.readUTF8()}`, value)];
  }
});

ATTRIBUTE_PARSERS.set(0x0025, {
  name: "USE-CANDIDATE",
  parse: (value: ByteRange) => {
    return [];
  }
});

ATTRIBUTE_PARSERS.set(0x0024, {
  name: "PRIORITY",
  parse: (value: ByteRange) => {
    return [new Tree(`Priority: ${value.readUIntBE()}`, value)];
  }
});

ATTRIBUTE_PARSERS.set(0x0008, {
  name: "MESSAGE-INTEGRITY",
  parse: (value: ByteRange) => {
    return [new Tree(`HMAC-SHA1: 0x${value.toHex()}`, value)];
  }
});

ATTRIBUTE_PARSERS.set(0x8028, {
  name: "FINGERPRINT",
  parse: (value: ByteRange) => {
    return [new Tree(`CRC-32: 0x${value.toHex()}`, value)];
  }
});

ATTRIBUTE_PARSERS.set(0x8029, {
  name: "ICE-CONTROLLED",
  parse: (value: ByteRange) => {
    return [new Tree(`Tiebreaker: 0x${value.toHex()}`, value)];
  }
});

ATTRIBUTE_PARSERS.set(0x802a, {
  name: "ICE-CONTROLLING",
  parse: (value: ByteRange) => {
    return [new Tree(`Tiebreaker: 0x${value.toHex()}`, value)];
  }
});

ATTRIBUTE_PARSERS.set(0xc057, {
  name: "NETWORK-COST",
  parse: (value: ByteRange) => {
    let networkID = value.bytes(0, 2);
    let networkCost = value.bytes(2, 2);
    return [
      new Tree(`Network ID: ${networkID.readUIntBE()}`, networkID),
      new Tree(`Network Cost: ${networkCost.readUIntBE()}`, networkCost)
    ];
  }
});

function parseAttributes(range: ByteRange): Tree {
  let attributes: Array<Tree> = [];

  let ptr = range;
  while (ptr.byteLength > 0) {
    let type = ptr.bytes(0, 2);
    let length = ptr.bytes(2, 2);

    let paddedLength = length.readUIntBE();
    if (paddedLength % 4 !== 0) {
      paddedLength += 4 - (paddedLength % 4);
    }

    let attrRange = ptr.bytes(0, 4 + paddedLength);
    let value = ptr.bytes(4, length.readUIntBE());

    let attrParser = ATTRIBUTE_PARSERS.get(type.readUIntBE());

    let attributeInfo = [
      new Tree(`Type: 0x${type.toHex()}`, type),
      new Tree(`Length: ${length.readUIntBE()}`, type)
    ];
    if (attrParser) {
      attributeInfo = attributeInfo.concat(attrParser.parse(value));
    } else {
      attributeInfo.push(new Tree(`Value: ${value.toHex()}`, value));
    }

    attributes.push(
      new Tree(
        attrParser ? attrParser.name : `UNKNOWN`,
        attrRange,
        attributeInfo
      )
    );

    // Advance to next attribute.
    ptr = ptr.bytes(4 + paddedLength);
  }

  return new Tree(`Attributes`, range, attributes);
}

function inspect(range: ByteRange): Tree {
  let msgType = range.bits(2, 14);
  let msgLength = range.bytes(2, 2);
  let magicCookie = range.bytes(4, 4);
  let transactionID = range.bytes(8, 12);

  return new Tree(`STUN Packet`, range, [
    new Tree(`Message Type: ${msgType.readUIntBE()}`, msgType),
    new Tree(`Message Length: ${msgLength.readUIntBE()}`, msgLength),
    new Tree(`Magic Cookie: ${magicCookie.toHex()}`, magicCookie),
    new Tree(`Transaction ID: ${transactionID.toHex()}`, transactionID),
    parseAttributes(range.bytes(20, msgLength.readUIntBE()))
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
