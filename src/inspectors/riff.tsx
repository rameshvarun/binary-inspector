import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

import { hexEllipsis } from "../core/utils";

type ChunkParser = {
  name: string;
  parser: (range: ByteRange) => Array<Tree>;
};

const CHUNK_PARSERS: Map<string, ChunkParser> = new Map();

CHUNK_PARSERS.set("RIFF", {
  name: "RIFF Chunk",
  parser: (range: ByteRange) => {
    let type = range.bytes(0, 4);
    let chunks = inspectChunks(range.bytes(4));

    return [new Tree(`Form Type: ${type.readUTF8()}`, type)].concat(chunks);
  }
});

CHUNK_PARSERS.set("LIST", {
  name: "LIST Chunk",
  parser: (range: ByteRange) => {
    let type = range.bytes(0, 4);
    let chunks = inspectChunks(range.bytes(4));

    return [new Tree(`Form Type: ${type.readUTF8()}`, type)].concat(chunks);
  }
});

function inspectChunks(range: ByteRange): Array<Tree> {
  let chunks: Array<Tree> = [];

  let ptr = range;
  while (ptr.byteLength > 0) {
    let [chunkRange, chunkTree] = inspectChunk(ptr);

    chunks.push(chunkTree);
    ptr = ptr.bytes(chunkRange.size());
  }

  return chunks;
}

function inspectChunk(range: ByteRange): [ByteRange, Tree] {
  let type = range.bytes(0, 4);
  let size = range.bytes(4, 4);
  let sizeBytes = size.readUIntLE();

  let data = range.bytes(8, sizeBytes);

  let chunkParser = CHUNK_PARSERS.get(type.readUTF8());
  let name = chunkParser ? chunkParser.name : "Unknown Chunk";

  let chunkElements = chunkParser
    ? chunkParser.parser(data)
    : [new Tree(`Data: ${hexEllipsis(data)}`, data)];

  let pad = sizeBytes % 2 == 0 ? 0 : 1;
  let chunkRange = range.bytes(0, 8 + sizeBytes + pad);

  return [
    chunkRange,
    new Tree(
      name,
      chunkRange,
      [
        new Tree(`Chunk Type: ${type.readUTF8()}`, type),
        new Tree(`Chunk Size: ${size.readUIntLE()}`, size)
      ].concat(chunkElements)
    )
  ];
}

function inspect(range: ByteRange): Tree {
  return inspectChunk(range)[1];
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
