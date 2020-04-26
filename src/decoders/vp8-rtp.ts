import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";

enum ReconstructionFilter {
  BICUBIC = "Bicubic",
  BILINEAR = "Bilinear",
  NONE = "None",
  OTHER = "Other"
}

enum LoopFilter {
  NORMAL = "Normal",
  SIMPLE = "Simple",
  NONE = "None",
  OTHER = "Other"
}

function parseVersion(ver: number): [ReconstructionFilter, LoopFilter] {
  switch (ver) {
    case 0:
      return [ReconstructionFilter.BICUBIC, LoopFilter.NORMAL];
    case 1:
      return [ReconstructionFilter.BILINEAR, LoopFilter.SIMPLE];
    case 2:
      return [ReconstructionFilter.BILINEAR, LoopFilter.NONE];
    case 3:
      return [ReconstructionFilter.NONE, LoopFilter.NONE];
    default:
      return [ReconstructionFilter.OTHER, LoopFilter.OTHER];
  }
}

export function inspect(range: ByteRange): Tree {
  let ptr = range;

  let x = ptr.bits(0, 1);
  let r1 = ptr.bits(1, 1);
  let n = ptr.bits(2, 1);
  let s = ptr.bits(3, 1);
  let r2 = ptr.bits(4, 1);
  let pid = ptr.bits(5, 3);
  ptr = ptr.bytes(1);

  let elements = [
    new Tree(`X (Extended Control Bits): ${x.readBool()}`, x),
    new Tree(`N (Non-reference Frame): ${n.readBool()}`, n),
    new Tree(`S (Start of Partition): ${s.readBool()}`, s),
    new Tree(`PID (Partition Index): ${pid.readUIntBE()}`, pid)
  ];

  if (x.readBool()) {
    let i = ptr.bits(0, 1);
    let l = ptr.bits(1, 1);
    let t = ptr.bits(2, 1);
    let k = ptr.bits(3, 1);
    let rsv = ptr.bits(4, 4);
    ptr = ptr.bytes(1);

    elements.push(
      new Tree(`I (PictureID present): ${i.readBool()}`, i),
      new Tree(`L (TL0PICIDX present): ${l.readBool()}`, l),
      new Tree(`T (TID present): ${t.readBool()}`, t),
      new Tree(`K (KEYIDX present): ${k.readBool()}`, k)
    );

    if (i.readBool()) {
      let m = ptr.bits(0, 1);
      let pictureID: BitRange | null = null;
      if (m.readBool()) {
        pictureID = ptr.bits(1, 15);
        ptr = ptr.bytes(2);
      } else {
        pictureID = ptr.bits(1, 7);
        ptr = ptr.bytes(1);
      }

      elements.push(
        new Tree(`M: ${m.readBool()}`, m),
        new Tree(`PictureID: ${pictureID.readUIntBE()}`, pictureID)
      );
    }

    if (l.readBool()) {
      let TL0PICIDX = ptr.bytes(0, 1);
      ptr = ptr.bytes(1);

      elements.push(
        new Tree(`TL0PICIDX: ${TL0PICIDX.readUIntBE()}`, TL0PICIDX)
      );
    }

    if (t.readBool() || k.readBool()) {
      let tid = ptr.bits(0, 2);
      let y = ptr.bits(2, 1);
      let keyIDX = ptr.bits(3, 5);

      ptr = ptr.bytes(1);

      elements.push(
        new Tree(`TID: ${tid.readUIntBE()}`, tid),
        new Tree(`Y: ${y.readBool()}`, y),
        new Tree(`KEYIDX: ${keyIDX.readUIntBE()}`, keyIDX)
      );
    }
  }

  if (s.readBool() && pid.readUIntBE() === 0) {
    let p = ptr.bits(7, 1);
    let ver = ptr.bits(4, 3);
    let h = ptr.bits(3, 1);

    // TODO: 19-bit Size

    elements.push(
      new Tree(
        `P: ${p.readBool()} (${p.readBool() ? "Interframe" : "Key frame"})`,
        p
      ),
      new Tree(
        `VER: ${ver.readUIntBE()} (${parseVersion(ver.readUIntBE())})`,
        ver
      ),
      new Tree(
        `H: ${h.readBool()} (${h.readBool() ? "Shown Frame" : "Hidden Frame"})`,
        h
      )
    );
  }

  return new Tree(`VP8 RTP Payload`, range, elements);
}
