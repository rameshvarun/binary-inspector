import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Container } from "react-bootstrap";
import { Tree } from "../core/tree";

const RTCP_PARSERS = new Map<number, (range: ByteRange) => Tree>();

// SR: Sender Report RTCP Packet
RTCP_PARSERS.set(200, (range: ByteRange) => {
  let v = range.bits(0, 2);
  assert.equal(v.readUIntBE(), 2, "Expected the version number to be 2.");

  let p = range.bits(2, 1);
  assert.isFalse(p.readBool(), "RTCP packet padding unimplemented.");

  let rc = range.bits(3, 5);
  let pt = range.bytes(1, 1);
  let length = range.bytes(2, 2);

  let ssrc = range.bytes(4, 4);

  let ntp = range.bytes(8, 8);
  let rtpTimestamp = range.bytes(16, 4);

  let packetCount = range.bytes(20, 4);
  let octetCount = range.bytes(24, 4);

  return new Tree(`RTCP Sender Report`, range, [
    new Tree(`Version: ${v.readUIntBE()}`, v),
    new Tree(`Padding: ${p.readBool()}`, p),
    new Tree(`RC: ${rc.readUIntBE()}`, rc),
    new Tree(`Payload Type: ${pt.readUIntBE()}`, pt),
    new Tree(
      `Length: ${length.readUIntBE()} (${4 * (length.readUIntBE() + 1)} bytes)`,
      length
    ),
    new Tree(`SSRC: ${ssrc.readUIntBE()}`, ssrc),
    new Tree(`NTP Timestamp: ${ntp.readUIntBE()}`, ntp),
    new Tree(`RTP Timestamp: ${rtpTimestamp.readUIntBE()}`, rtpTimestamp),

    new Tree(`Sender's Packet Count: ${packetCount.readUIntBE()}`, packetCount),
    new Tree(`Sender's Octect Count: ${octetCount.readUIntBE()}`, octetCount)
  ]);
});

function inspect(range: ByteRange): Tree {
  let packets: Array<Tree> = [];
  let ptr = range;

  try {
    while (ptr.byteLength > 0) {
      let v = ptr.bits(0, 2);
      assert.equal(v.readUIntBE(), 2, "Expected the version number to be 2.");

      let p = ptr.bits(2, 1);

      let pt = ptr.bytes(1, 1);
      let length = ptr.bytes(2, 2);

      let packetLength = (length.readUIntBE() + 1) * 4;
      let packetRange = ptr.bytes(0, packetLength);

      let parser = RTCP_PARSERS.get(pt.readUIntBE());
      if (parser) packets.push(parser(packetRange));
      else packets.push(new Tree("Unknown RTCP Packet", packetRange));

      ptr = ptr.bytes(packetLength);
    }
  } catch (e) {
    packets.push(new Tree(`Malformed Packet: ${e.message}`, ptr, undefined, e));
  }

  if (packets.length == 1) return packets[0];
  else return new Tree("RTCP Compund Packet", range, packets);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
