import * as React from "react";
import * as ReactDOM from "react-dom";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

function inspectFixmap(range: ByteRange): [Tree, ByteRange] {
  const tag = range.bits(0, 4);
  const n = range.bits(4, 4);

  const entries: Array<Tree> = [];
  let ptr = range.bytes(1);
  for (let i = 0; i < n.readUIntBE(); ++i) {
    let key: Tree, value: Tree;
    [key, ptr] = inspectValue(ptr);
    [value, ptr] = inspectValue(ptr);

    let entryRange = (key.range as ByteRange).merge(value.range as ByteRange);
    entries.push(new Tree("Entry", entryRange, [key, value]));
  }

  const mapRange = range.bytes(0, ptr.byteStart - range.byteStart);

  return [
    new Tree(
      `Fixmap, n=${n.readUIntBE()}`,
      mapRange,
      [new Tree(`Tag`, tag), new Tree(`n = ${n.readUIntBE()}`, n)].concat(
        entries
      )
    ),
    ptr
  ];
}

function inspectFixstr(range: ByteRange): [Tree, ByteRange] {
  const tag = range.bits(0, 3);
  const size = range.bits(3, 5);
  const data = range.bytes(1, size.readUIntBE());
  const fixstr = range.bytes(0, 1 + size.readUIntBE());
  const ptr = range.bytes(1 + size.readUIntBE());

  return [
    new Tree(`fixstr ("${data.readUTF8()}")`, fixstr, [
      new Tree(`Tag`, tag),
      new Tree(`Size: ${size.readUIntBE()}`, size),
      new Tree(`Data: ${data.readUTF8()}`, data)
    ]),
    ptr
  ];
}

function inspectPositiveFixnum(range: ByteRange): [Tree, ByteRange] {
  const tag = range.bits(0, 1);
  const value = range.bits(1, 7);
  return [
    new Tree(`Fixnum (${value.readUIntBE()})`, range.bytes(0, 1), [
      new Tree("Tag", tag),
      new Tree("Value", value)
    ]),
    range.bytes(1)
  ];
}

function inspectUint8(range: ByteRange): [Tree, ByteRange] {
  const tag = range.bytes(0, 1);
  const value = range.bytes(1, 1);
  return [
    new Tree(`uint 8 (${value.readUIntBE()})`, range.bytes(0, 2), [
      new Tree("Tag", tag),
      new Tree("Value", value)
    ]),
    range.bytes(2)
  ];
}

function inspectFloat64(range: ByteRange): [Tree, ByteRange] {
  const tag = range.bytes(0, 1);
  const value = range.bytes(1, 8);
  return [
    new Tree(`float64 (${value.readFloat64BE()})`, range.bytes(0, 9), [
      new Tree("Tag", tag),
      new Tree("Value", value)
    ]),
    range.bytes(9)
  ];
}

function inspectFixarray(range: ByteRange): [Tree, ByteRange] {
  const tag = range.bits(0, 4);
  const n = range.bits(4, 4);

  const entries: Array<Tree> = [];
  let ptr = range.bytes(1);
  for (let i = 0; i < n.readUIntBE(); ++i) {
    let entry: Tree;
    [entry, ptr] = inspectValue(ptr);
    entries.push(entry);
  }

  const arrayRange = range.bytes(0, ptr.byteStart - range.byteStart);

  return [
    new Tree(
      `Fixarray, n=${n.readUIntBE()}`,
      arrayRange,
      [new Tree(`Tag`, tag), new Tree("n", n)].concat(entries)
    ),
    ptr
  ];
}

function inspectNil(range: ByteRange): [Tree, ByteRange] {
  return [new Tree(`Nil`, range.bytes(0, 1)), range.bytes(1)];
}

function inspectExt(range: ByteRange, lengthSize: number): [Tree, ByteRange] {
  const tag = range.bytes(0, 1);
  const size = range.bytes(1, lengthSize);
  const type = range.bytes(1 + lengthSize, 1);

  const HEADER_SIZE_BYTES = 2 + lengthSize;

  const data = range.bytes(HEADER_SIZE_BYTES, size.readUIntBE());
  const ext32 = range.bytes(0, HEADER_SIZE_BYTES + size.readUIntBE());
  const ptr = range.bytes(HEADER_SIZE_BYTES + size.readUIntBE());

  return [
    new Tree(`ext 32`, ext32, [
      new Tree(`Tag`, tag),
      new Tree(`Size: ${size.readUIntBE()}`, size),
      new Tree(`Type: ${type.readUIntBE()}`, type),
      new Tree(`Data`, data)
    ]),
    ptr
  ];
}

function inspectBoolean(range: ByteRange, value: boolean): [Tree, ByteRange] {
  return [new Tree(`bool (${value})`, range.bytes(0, 1)), range.bytes(1)];
}

function inspectValue(range: ByteRange): [Tree, ByteRange] {
  if (range.bits(0, 4).readUIntBE() === 8) {
    return inspectFixmap(range);
  } else if (range.bits(0, 3).readUIntBE() === 5) {
    return inspectFixstr(range);
  } else if (range.bits(0, 1).readUIntBE() === 0) {
    return inspectPositiveFixnum(range);
  } else if (range.bytes(0, 1).readUIntBE() === 203) {
    return inspectFloat64(range);
  } else if (range.bits(0, 4).readUIntBE() === 9) {
    return inspectFixarray(range);
  } else if (range.bytes(0, 1).readUIntBE() === 204) {
    return inspectUint8(range);
  } else if (range.bytes(0, 1).readUIntBE() === 192) {
    return inspectNil(range);
  } else if (range.bytes(0, 1).readUIntBE() === 0xc7) {
    return inspectExt(range, 1);
  } else if (range.bytes(0, 1).readUIntBE() === 0xc8) {
    return inspectExt(range, 2);
  } else if (range.bytes(0, 1).readUIntBE() === 0xc9) {
    return inspectExt(range, 4);
  } else if (range.bytes(0, 1).readUIntBE() === 0xc3) {
    return inspectBoolean(range, true);
  } else if (range.bytes(0, 1).readUIntBE() === 0xc2) {
    return inspectBoolean(range, false);
  } else {
    throw new Error(`Unimplemented type code: ${range.bytes(0, 1).toHex()}`);
  }
}

function inspect(range: ByteRange): Tree {
  return inspectValue(range)[0];
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
