import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";
import { Color } from "../core/color";

import { hexEllipsis } from "../core/utils";

type ChunkParser = {
  name: string;
  parser: (range: ByteRange) => Array<Tree>;
};

const CHUNK_PARSERS: Map<string, ChunkParser> = new Map();

CHUNK_PARSERS.set("IHDR", {
  name: "Image Header",
  parser: (range: ByteRange) => {
    let width = range.bytes(0, 4);
    let height = range.bytes(4, 4);

    let bitDepth = range.bytes(8, 1);
    let colorType = range.bytes(9, 1);

    let compressionMethod = range.bytes(10, 1);
    let filterMethod = range.bytes(11, 1);
    let interlaceMethod = range.bytes(12, 1);

    return [
      new Tree(`Width: ${width.readUIntBE()}`, width),
      new Tree(`Height: ${height.readUIntBE()}`, height),

      new Tree(`Bit Depth: ${bitDepth.readUIntBE()}`, bitDepth),

      new Tree(`Color Type: ${colorType.readUIntBE()}`, colorType),

      new Tree(
        `Compression Method: ${compressionMethod.readUIntBE()}`,
        compressionMethod
      ),
      new Tree(`Filter Method: ${filterMethod.readUIntBE()}`, filterMethod),
      new Tree(
        `Interlace Method: ${interlaceMethod.readUIntBE()}`,
        interlaceMethod
      )
    ];
  }
});

CHUNK_PARSERS.set("tEXt", {
  name: "Textual Data",
  parser: (range: ByteRange) => {
    let nullIndex = range.toUint8Array().findIndex(val => val === 0);
    let keyword = range.bytes(0, nullIndex);
    let separator = range.bytes(nullIndex, 1);
    let text = range.bytes(nullIndex + 1);

    return [
      new Tree(`Keyword: ${keyword.readUTF8()}`, keyword),
      new Tree(`Null Separator`, separator),
      new Tree(`Text: ${text.readUTF8()}`, text)
    ];
  }
});

function inspect(range: ByteRange): Tree {
  let signature = range.bytes(0, 8);

  let chunks: Array<Tree> = [];
  let ptr = range.bytes(8);
  while (ptr.byteLength > 0) {
    let length = ptr.bytes(0, 4);
    let type = ptr.bytes(4, 4);

    let byteLen = length.readUIntBE();
    let data = ptr.bytes(8, byteLen);
    let crc = ptr.bytes(8 + byteLen, 4);

    let chunkSize = 8 + byteLen + 4;

    let chunkParser = CHUNK_PARSERS.get(type.readUTF8());
    let chunkElements = chunkParser
      ? chunkParser.parser(data)
      : [new Tree(`Data: ${hexEllipsis(data)}`, data)];

    chunks.push(
      new Tree(
        `Chunk (${type.readUTF8()})`,
        ptr.bytes(0, chunkSize),
        [
          new Tree(`Length: ${byteLen}`, length).withColor(Color.blue()),
          new Tree(`Type: ${type.readUTF8()}`, type).withColor(Color.orange())
        ]
          .concat(chunkElements)
          .concat([new Tree(`CRC: ${crc.readUIntBE()}`, crc).withColor(Color.brown())])
      ).withColor(Color.green())
    );

    ptr = ptr.bytes(chunkSize);
  }

  return new Tree("PNG Image", range, [
    new Tree(`Signature: ${signature.toHex()}`, signature).withColor(Color.red()),
    new Tree(`Chunks (${chunks.length})`, range.bytes(8), chunks).withColor(Color.magenta())
  ]);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
