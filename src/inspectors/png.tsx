import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

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

    chunks.push(
      new Tree(`Chunk (${type.readUTF8()})`, ptr.bytes(0, chunkSize), [
        new Tree(`Length: ${byteLen}`, length),
        new Tree(`Type: ${type.readUTF8()}`, type),
        new Tree(`Data: ${data.toHex()}`, data),
        new Tree(`CRC: ${crc.readUIntBE()}`, crc)
      ])
    );

    ptr = ptr.bytes(chunkSize);
  }

  return new Tree("PNG Image", range, [
    new Tree(`Signature: ${signature.toHex()}`, signature),
    new Tree(`Chunks (${chunks.length})`, range.bytes(8), chunks)
  ]);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
