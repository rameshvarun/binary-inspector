import {ByteRange, BitRange} from './range.ts';

enum Mode {
  SILK_ONLY = "SILK-only",
  HYBRID = "Hybrid",
  CELT_ONLY = "CELT-only",
}

enum Bandwidth {
  NB = "NB", MB = "MB", WB = "WB", SWB = "SWB", FB = "FB"
}

function getSampleRate(bandwidth: Bandwidth): number {
  switch (bandwidth) {
    case Bandwidth.NB: return 8000;
    case Bandwidth.MB: return 12000;
    case Bandwidth.WB: return 16000;
    case Bandwidth.SWB: return 24000;
    case Bandwidth.FB: return 48000;
  }
}

function getBandwidth(bandwidth: Bandwidth): number {
  switch (bandwidth) {
    case Bandwidth.NB: return 4000;
    case Bandwidth.MB: return 6000;
    case Bandwidth.WB: return 8000;
    case Bandwidth.SWB: return 12000;
    case Bandwidth.FB: return 20000;
  }
}

const SILK_ONLY_FRAME_SIZES = [10, 20, 40, 60];
const HYBRID_FRAME_SIZES = [10, 20];
const CELT_ONLY_FRAME_SIZES = [2.5, 5, 10, 20];

function parseConfig(config) {
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
  } else {
    throw new Error(`Unknown config ${config}.`);
  }
}

class Tree {
  label: string;
  range: ByteRange | BitRange;
  children: Array<Tree>;

  constructor(label: string, range: ByteRange | BitRange, children: Array<Tree> = []): range {
    this.label = label;
    this.range = range;
    this.children = children;
  }
}


function decode(range: ByteRange): Tree {
  let toc = data.bytes(0, 1);
  let config = toc.bits(0, 5);
  let s = toc.bits(5, 1);
  let c = toc.bits(6, 2);

  return new Tree(`Opus Packet`, range, [
    new Tree(`Config: ${config.readUIntBE()} (${parseConfig(config.readUIntBE()).join(', ')})`, config),
    new Tree(`Channels: ${s.readBool() ? "Stereo" : "Mono"}`, s),
    new Tree(`Frame Packing Code: ${c.readUIntBE()}`, c)]);
}


let PACKET = "4b";

let arrayBuffer = new Uint8Array(PACKET.match(/[\da-f]{2}/gi).map(function (h) {
  return parseInt(h, 16)
})).buffer;

let data = new ByteRange(arrayBuffer, 0, arrayBuffer.length);
let tree = decode(data);

function treeToHTML(tree) {
  if (tree.children.length > 0) {
    return `<details open>
      <summary>${tree.label}</summary>
      ${tree.children.map(t => `<div style="padding-left: 15px">${treeToHTML(t)}</div>`).join('')}
    </details>`;
  } else {
    return tree.label;
  }
}

document.write(treeToHTML(tree));
