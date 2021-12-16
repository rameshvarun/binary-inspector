import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

import * as opus from "../decoders/opus";
import * as vp8 from "../decoders/vp8-rtp";
import * as red from "../decoders/red";
import * as ulpfec from "../decoders/ulpfec";

import * as utils from "../core/utils";

export const HEADER_EXTENSION_PARSERS = new Map();

export type PayloadParser = {
  name: string;
  id: string;
  inspect: (range: ByteRange, payloadTypes: Map<number, PayloadParser>) => Tree;
  defaultPT: number;
};

export const PAYLOAD_PARSERS: Array<PayloadParser> = [
  {
    name: "Opus (RFC 7587)",
    id: "opus",
    inspect: opus.inspect,
    defaultPT: 111
  },
  {
    name: "RED (RFC 2198)",
    id: "red",
    inspect: red.inspect,
    defaultPT: 108
  },
  {
    name: "VP8 (RFC 7741)",
    id: "vp8",
    inspect: vp8.inspect,
    defaultPT: 96
  },
  {
    name: "ULPFEC (RFC 5109)",
    id: "ulpfec",
    inspect: ulpfec.inspect,
    defaultPT: 124
  }
];

function inspectOneByteHeaderExtensions(range: ByteRange) {
  let headers: Array<Tree> = [];

  let ptr = range;
  while (ptr.size() > 0) {
    let header = ptr.bytes(0, 1);
    if (header.readUIntBE() == 0) {
      ptr = ptr.bytes(1);
      continue;
    }

    let id = header.bits(0, 4);
    let len = header.bits(4, 4);

    console.log(id.readUIntBE());
    console.log(len.readUIntBE());

    let dataLength = len.readUIntBE() + 1;
    let data = ptr.bytes(1, dataLength);
    headers.push(
      new Tree(`Header`, ptr.bytes(0, 1 + dataLength), [
        new Tree(`ID: ${id.readUIntBE()}`, id),
        new Tree(`Length: ${len.readUIntBE()} (${dataLength} bytes)`, len),
        new Tree(`Data: ${data.toHex()}`, data)
      ])
    );

    ptr = ptr.bytes(1 + dataLength);
  }

  return new Tree(`Headers`, range, headers);
}

export function inspect(
  range: ByteRange,
  payloadTypes: Map<number, PayloadParser>
): Tree {
  let packetRange = range;

  let v = range.bits(0, 2);
  let p = range.bits(2, 1);
  let x = range.bits(3, 1);
  let cc = range.bits(4, 4);

  let m = range.bits(8, 1);
  let pt = range.bits(9, 7);

  let seq = range.bytes(2, 2);
  let timestamp = range.bytes(4, 4);
  let ssrc = range.bytes(8, 4);

  let elements = [
    new Tree(`Version: ${v.readUIntBE()}`, v),
    new Tree(`Padding: ${p.readBool()}`, p),
    new Tree(`Extension: ${x.readBool()}`, x),
    new Tree(`CSRC count: ${cc.readUIntBE()}`, cc),
    new Tree(`Marker: ${m.readBool()}`, m),
    new Tree(`Payload Type: ${pt.readUIntBE()}`, pt),

    new Tree(`Sequence Number: ${seq.readUIntBE()}`, seq),
    new Tree(`Timestamp: ${timestamp.readUIntBE()}`, timestamp),
    new Tree(`SSRC: ${ssrc.readUIntBE()}`, ssrc)
  ];

  if (p.readBool() || cc.readUIntBE() > 0) assert.fail("Unimplemented.");

  // Advange range past header.
  range = range.bytes(12);

  if (x.readBool()) {
    let profile = range.bytes(0, 2);
    let length = range.bytes(2, 2);

    let lengthBytes = length.readUIntBE() * 4;
    let headerData = range.bytes(4, lengthBytes);

    elements.push(
      new Tree(`Defined By Profile: 0x${profile.toHex()}`, profile)
    );
    elements.push(
      new Tree(
        `Header Length: ${length.readUIntBE()} (${lengthBytes} bytes)`,
        length
      )
    );

    if (profile.readUIntBE() == 48862) {
      elements.push(inspectOneByteHeaderExtensions(headerData));
    } else {
      elements.push(new Tree(`Header Data: ${headerData.toHex()}`, headerData));
    }

    range = range.bytes(4 + lengthBytes);
  }

  let payloadType = pt.readUIntBE();
  let payload = range;

  if (payloadTypes.has(payloadType)) {
    let parser = payloadTypes.get(payloadType)!;
    let payloadTree = parser.inspect(payload, payloadTypes);
    elements.push(new Tree(`Payload: ${parser.name}`, payload, [payloadTree]));
  } else {
    elements.push(new Tree(`Payload: ${utils.hexEllipsis(payload)}`, payload));
  }

  return new Tree(`RTP Packet`, packetRange, elements);
}
