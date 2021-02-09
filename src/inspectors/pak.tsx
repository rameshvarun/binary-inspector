import * as React from "react";
import * as ReactDOM from "react-dom";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

function inspectFileEntry(range: ByteRange): Tree {
  let name = range.bytes(0, 56);
  let offset = range.bytes(56, 4);
  let size = range.bytes(60, 4);

  return new Tree(`File Table Entry: ${name.readUTF8()}`, range, [
    new Tree(`Name: ${name.readUTF8()}`, name),
    new Tree(`File Offset: ${offset.readUIntLE()}`, offset),
    new Tree(`File Size: ${size.readUIntLE()}`, size)
  ]);
}

function inspectFileTable(range: ByteRange): Tree {
  return new Tree(`File Table`, range, range.chunks(64).map(inspectFileEntry));
}

function inspect(range: ByteRange): Tree {
  let magic = range.bytes(0, 4);
  let tableOffset = range.bytes(4, 4);
  let tableSize = range.bytes(8, 4);

  let table = range.bytes(tableOffset.readUIntLE(), tableSize.readUIntLE());

  return new Tree("Quake PAK", range, [
    new Tree(`Magic: ${magic.readUTF8()}`, magic),
    new Tree(`File Table Offset: ${tableOffset.readUIntLE()}`, tableOffset),
    new Tree(`File Table Size: ${tableSize.readUIntLE()}`, tableSize),
    inspectFileTable(table)
  ]);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
