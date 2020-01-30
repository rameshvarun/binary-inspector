import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

enum Mode {
  SILK_ONLY = "SILK-only",
  HYBRID = "Hybrid",
  CELT_ONLY = "CELT-only"
}

enum Bandwidth {
  NB = "NB",
  MB = "MB",
  WB = "WB",
  SWB = "SWB",
  FB = "FB"
}

function getSampleRate(bandwidth: Bandwidth): number {
  switch (bandwidth) {
    case Bandwidth.NB:
      return 8000;
    case Bandwidth.MB:
      return 12000;
    case Bandwidth.WB:
      return 16000;
    case Bandwidth.SWB:
      return 24000;
    case Bandwidth.FB:
      return 48000;
  }
}

function getBandwidth(bandwidth: Bandwidth): number {
  switch (bandwidth) {
    case Bandwidth.NB:
      return 4000;
    case Bandwidth.MB:
      return 6000;
    case Bandwidth.WB:
      return 8000;
    case Bandwidth.SWB:
      return 12000;
    case Bandwidth.FB:
      return 20000;
  }
}

const SILK_ONLY_FRAME_SIZES = [10, 20, 40, 60];
const HYBRID_FRAME_SIZES = [10, 20];
const CELT_ONLY_FRAME_SIZES = [2.5, 5, 10, 20];

function parseConfig(config): [Mode, Bandwidth, number] {
  if (config <= 3) {
    return [Mode.SILK_ONLY, Bandwidth.NB, SILK_ONLY_FRAME_SIZES[config]];
  } else if (config <= 7) {
    return [Mode.SILK_ONLY, Bandwidth.MB, SILK_ONLY_FRAME_SIZES[config - 4]];
  } else if (config <= 11) {
    return [Mode.SILK_ONLY, Bandwidth.WB, SILK_ONLY_FRAME_SIZES[config - 8]];
  } else if (config <= 13) {
    return [Mode.HYBRID, Bandwidth.SWB, HYBRID_FRAME_SIZES[config - 12]];
  } else if (config <= 15) {
    return [Mode.HYBRID, Bandwidth.FB, HYBRID_FRAME_SIZES[config - 14]];
  } else if (config <= 19) {
    return [Mode.CELT_ONLY, Bandwidth.NB, CELT_ONLY_FRAME_SIZES[config - 16]];
  } else if (config <= 23) {
    return [Mode.CELT_ONLY, Bandwidth.WB, CELT_ONLY_FRAME_SIZES[config - 20]];
  } else if (config <= 27) {
    return [Mode.CELT_ONLY, Bandwidth.SWB, CELT_ONLY_FRAME_SIZES[config - 24]];
  } else if (config <= 31) {
    return [Mode.CELT_ONLY, Bandwidth.FB, CELT_ONLY_FRAME_SIZES[config - 28]];
  } else {
    throw new Error(`Unknown config ${config}.`);
  }
}

function inspectConfig(config: BitRange): Tree {
  let [mode, bw, fs] = parseConfig(config.readUIntBE());
  return new Tree(
    `Config: ${config.readUIntBE()} (${mode}, ${bw}, ${fs}ms)`,
    config,
    [
      new Tree(`Mode: ${mode}`, config),
      new Tree(
        `Bandwidth: ${bw} (${getBandwidth(bw)}Hz), Sample Rate: ${getSampleRate(
          bw
        )}Hz`,
        config
      ),
      new Tree(`Frame Size: ${fs}ms`, config)
    ]
  );
}

function inspectFrame(range: ByteRange): Tree {
  return new Tree(`Compressed Frame`, range, []);
}

function inspectFrames(c: number, range: ByteRange): Tree {
  let frames: Array<Tree> = [];
  if (c == 0) {
    frames = [inspectFrame(range)];
  } else if (c == 1) {
    assert(range.byteLength % 2 == 0);
    frames = [
      inspectFrame(range.bytes(0, range.byteLength / 2)),
      inspectFrame(range.bytes(range.byteLength / 2))
    ];
  }

  return new Tree(`Compressed Frames`, range, frames);
}

export function inspect(range: ByteRange): Tree {
  let toc = range.bytes(0, 1);
  let config = toc.bits(0, 5);
  let s = toc.bits(5, 1);
  let c = toc.bits(6, 2);

  let packingCodes = [
    "1 Frame",
    "2 Frame, Equal Size",
    "2 Frames, Different Size",
    "Arbitrary Frames"
  ];

  return new Tree(`Opus Packet`, range, [
    inspectConfig(config),
    new Tree(`Channels: ${s.readBool() ? "Stereo" : "Mono"}`, s),
    new Tree(
      `Frame Packing Mode: ${c.readUIntBE()} (${packingCodes[c.readUIntBE()]})`,
      c
    ),
    inspectFrames(c.readUIntBE(), range.bytes(1))
  ]);
}
