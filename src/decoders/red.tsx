import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";
import * as utils from "../core/utils";

export function inspect(
  range: ByteRange,
  payloadTypes: Map<number, any>
): Tree {
  let elements: Array<Tree> = [];

  let blockPts: Array<number> = [];
  let blockLengths: Array<number> = [];

  let ptr = range;
  while (true) {
    let f = ptr.bits(0, 1);
    let pt = ptr.bits(1, 7);

    if (f.readBool()) {
      let timestampOffset = ptr.bits(8, 14);
      let blockLength = ptr.bits(22, 10);
      elements.push(
        new Tree(`Block Header`, ptr, [
          new Tree(`F: ${f.readBool()}`, f),
          new Tree(`Payload Type: ${pt.readUIntBE()}`, pt),
          new Tree(
            `Timestamp Offset: ${timestampOffset.readUIntBE()}`,
            timestampOffset
          ),
          new Tree(
            `Block Length: ${blockLength.readUIntBE()} bytes`,
            blockLength
          )
        ])
      );

      blockPts.push(pt.readUIntBE());
      blockLengths.push(blockLength.readUIntBE());
      ptr = ptr.bytes(4);
    } else {
      let f = ptr.bits(0, 1);
      let pt = ptr.bits(1, 7);

      elements.push(
        new Tree(`Block Header (Primary Encoding)`, ptr.bytes(0, 1), [
          new Tree(`F: ${f.readBool()}`, f),
          new Tree(`Payload Type: ${pt.readUIntBE()}`, pt)
        ])
      );

      blockPts.push(pt.readUIntBE());
      ptr = ptr.bytes(1);
      break;
    }
  }

  for (let pt of blockPts) {
    if (blockLengths.length > 0) throw new Error(`Unimplemented.`);

    if (payloadTypes.has(pt)) {
      let parser = payloadTypes.get(pt)!;
      let payloadTree = parser.inspect(ptr, payloadTypes);
      elements.push(new Tree(`Payload: ${parser.name}`, ptr, [payloadTree]));
    } else {
      elements.push(new Tree(`Payload: ${utils.hexEllipsis(ptr)}`, ptr));
    }
  }

  return new Tree(`Red Packet`, range, elements);
}
