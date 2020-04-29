import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

function inspectLevels(range: ByteRange): Tree {
  let elements: Array<Tree> = [];
  let ptr = range;

  let i = 0;
  while (ptr.size() > 0) {
    let protectionLength = ptr.bytes(0, 2);
    let mask = ptr.bytes(2, 2);

    elements.push(
      new Tree(`FEC Level ${i} Header`, ptr.bytes(0, 4), [
        new Tree(
          `Protection Length: ${protectionLength.readUIntBE()}`,
          protectionLength
        ),
        new Tree(`Mask: ${mask.toHex()}`, mask)
      ])
    );
    ptr = ptr.bytes(4);

    let payloadLength = protectionLength.readUIntBE();
    elements.push(
      new Tree(`FEC Level ${i} Payload`, ptr.bytes(0, payloadLength))
    );
    ptr = ptr.bytes(payloadLength);

    i++;
  }

  return new Tree(`FEC Levels`, range, elements);
}

export function inspect(range: ByteRange): Tree {
  let e = range.bits(0, 1);
  let l = range.bits(1, 1);
  let p = range.bits(2, 1);
  let x = range.bits(3, 1);
  let cc = range.bits(4, 4);

  let m = range.bits(8, 1);
  let pt = range.bits(9, 7);

  let snBase = range.bytes(2, 2);
  let tsRecovery = range.bytes(4, 4);
  let lengthRecovery = range.bytes(8, 2);

  if (l.readBool()) throw new Error(`Long mask unimplemented.`);

  let levels = inspectLevels(range.bytes(10));

  return new Tree(`ULPFEC Packet`, range, [
    new Tree(`E: ${e.readBool()}`, e),
    new Tree(`L: ${l.readBool()}`, l),
    new Tree(`P: ${p.readBool()}`, p),
    new Tree(`X: ${x.readBool()}`, x),
    new Tree(`CC: ${cc.readUIntBE()}`, cc),

    new Tree(`M: ${m.readBool()}`, m),
    new Tree(`PT: ${pt.readUIntBE()}`, pt),

    new Tree(`SN Base: ${snBase.readUIntBE()}`, snBase),
    new Tree(`TS Recovery: ${tsRecovery.readUIntBE()}`, tsRecovery),
    new Tree(`Length Recovery: ${lengthRecovery.readUIntBE()}`, lengthRecovery),

    levels
  ]);
}
