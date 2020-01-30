import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";

const HEADER_EXTENSION_PARSERS = new Map();
const PAYLOAD_PARSERS = new Map();

function inspect(
  range: ByteRange,
  payloadTypes: Map<number, string>,
  headerExtensions: Map<number, string>
): Tree {
  let v = range.bits(0, 2);
  let p = range.bits(2, 1);
  let x = range.bits(3, 1);
  let cc = range.bits(4, 4);

  let m = range.bits(8, 1);
  let pt = range.bits(9, 7);

  let seq = range.bytes(2, 2);
  let timestamp = range.bytes(4, 4);
  let ssrc = range.bytes(4, 4);

  return new Tree(`RTP Packet`, range);
}
