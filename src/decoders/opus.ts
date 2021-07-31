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

type Config = [Mode, Bandwidth, number];

function parseConfig(config): Config {
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

function inspectConfig(config: BitRange): [Tree, Config] {
  let [mode, bw, fs] = parseConfig(config.readUIntBE());
  return [
    new Tree(
      `Config: ${config.readUIntBE()} (${mode}, ${bw}, ${fs}ms)`,
      config,
      [
        new Tree(`Mode: ${mode}`, config),
        new Tree(
          `Bandwidth: ${bw} (${getBandwidth(
            bw
          )}Hz), Sample Rate: ${getSampleRate(bw)}Hz`,
          config
        ),
        new Tree(`Frame Size: ${fs}ms`, config)
      ]
    ),
    [mode, bw, fs]
  ];
}

function getSILKFrameSize(opusFrameSize: number): number {
  switch (opusFrameSize) {
    case 10:
      return 10;
    case 20:
      return 20;
    case 40:
      return 20;
    case 60:
      return 20;
    default:
      throw new Error(`Unexpected Opus frame size ${opusFrameSize}.`);
  }
}

function inspectSILKFrame(
  range: ByteRange,
  opusFrameSize: number,
  stereo: boolean
): Tree {
  let silkFrameSize = getSILKFrameSize(opusFrameSize);
  let silkFramesCount = opusFrameSize / silkFrameSize;
  let channelCount = stereo ? 2 : 1;

  let channelNames = stereo ? ["Mid", "Side"] : ["Mono"];

  let headerTree: Array<Tree> = [];
  let ptr = range.bits(0);
  for (let i = 0; i < channelCount; ++i) {
    for (let j = 0; j < silkFramesCount; ++j) {
      // Read one bit.
      let vadFlag = ptr.bits(0, 1);
      ptr = ptr.bits(1);

      headerTree.push(
        new Tree(
          `${channelNames[i]}, Frame ${j + 1}, VAD Flag: ${vadFlag.readBool()}`,
          vadFlag
        )
      );
    }

    // Read one bit.
    let lbrrFlag = ptr.bits(0, 1);
    ptr = ptr.bits(1);

    headerTree.push(
      new Tree(
        `${channelNames[i]}, LBRR Flag: ${lbrrFlag.readBool()}`,
        lbrrFlag
      )
    );
  }

  return new Tree(
    `SILK Frame (${silkFramesCount} SILK Frames)`,
    range,
    headerTree
  );
}

function inspectFrame(
  range: ByteRange,
  mode: Mode,
  frameSize: number,
  stereo: boolean
): Tree {
  if (mode == Mode.SILK_ONLY) {
    return inspectSILKFrame(range, frameSize, stereo);
  }
  if (mode == Mode.HYBRID) {
    return new Tree(`Hybrid Frame`, range, [
      inspectSILKFrame(range, frameSize, stereo)
    ]);
  } else {
    return new Tree(`Compressed Frame (${range.size()} bytes)`, range, []);
  }
}

function readFrameLength(range: ByteRange): [number, ByteRange] {
  let firstByte = range.bytes(0, 1).readUIntBE();
  if (firstByte <= 251) {
    return [firstByte, range.bytes(0, 1)];
  } else {
    let secondByte = range.bytes(1, 1).readUIntBE();
    return [secondByte * 4 + firstByte, range.bytes(0, 2)];
  }
}

function inspectFrames(
  c: number,
  range: ByteRange,
  mode: Mode,
  frameSize: number,
  stereo: boolean
): Tree {
  let frames: Array<Tree> = [];

  try {
    if (c == 0) {
      frames = [inspectFrame(range, mode, frameSize, stereo)];
    } else if (c == 1) {
      assert(
        range.size() % 2 == 0,
        "In packing mode 2, the amount of bytes available for frames must be even."
      );
      frames = [
        inspectFrame(
          range.bytes(0, range.byteLength / 2),
          mode,
          frameSize,
          stereo
        ),
        inspectFrame(range.bytes(range.byteLength / 2), mode, frameSize, stereo)
      ];
    } else if (c == 2) {
      assert.fail("Packing mode 2 unimplemented.");
    } else if (c == 3) {
      let info = range.bytes(0, 1);
      let v = info.bits(0, 1);
      let p = info.bits(1, 1);
      let M = info.bits(2, 6);

      frames.push(new Tree(`Mode: ${v.readBool() ? "VBR" : "CBR"}`, v));
      frames.push(new Tree(`Padding: ${p.readBool()}`, p));
      frames.push(new Tree(`Frame Count: ${M.readUIntBE()}`, M));

      if (p.readBool()) assert.fail("Frame padding not implemented.");
      if (v.readBool()) {
        let frameLengths: Array<[number, ByteRange]> = [];
        let pointer = range.bytes(1);
        for (let i = 0; i < M.readUIntBE() - 1; ++i) {
          let [frameLength, frameLengthRange] = readFrameLength(pointer);
          frameLengths.push([frameLength, frameLengthRange]);
          pointer = pointer.bytes(frameLengthRange.size());
        }

        frames.push(
          new Tree(
            `Frame Lengths: ${frameLengths.length}`,
            range.bytes(1, pointer.byteStart - frameLengths[0][1].byteStart),
            frameLengths.map(
              f => new Tree(`${f[1].size()}-byte Frame Length: ${f[0]}`, f[1])
            )
          )
        );

        for (let [frameLength, _] of frameLengths) {
          let frameRange = pointer.bytes(0, frameLength);
          frames.push(inspectFrame(frameRange, mode, frameSize, stereo));

          pointer = pointer.bytes(frameLength);
        }

        let frameRange = pointer;
        frames.push(inspectFrame(frameRange, mode, frameSize, stereo));
      } else {
        assert.fail("CBR mode not implemented.");
      }
    }

    return new Tree(`Compressed Frames`, range, frames);
  } catch (e) {
    return new Tree(`Malformed Frames: ${e.message}`, range, frames, e);
  }
}

export function inspect(range: ByteRange): Tree {
  assert.isAtLeast(range.size(), 1, "Opus packet must be at least one byte.");

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

  let [configTree, [mode, bandwidth, frameSize]] = inspectConfig(config);

  return new Tree(`Opus Packet`, range, [
    configTree,
    new Tree(`Channels: ${s.readBool() ? "Stereo" : "Mono"}`, s),
    new Tree(
      `Frame Packing Mode: ${c.readUIntBE()} (${packingCodes[c.readUIntBE()]})`,
      c
    ),
    inspectFrames(c.readUIntBE(), range.bytes(1), mode, frameSize, s.readBool())
  ]);
}
