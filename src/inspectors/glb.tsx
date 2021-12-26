import * as React from "react";
import * as ReactDOM from "react-dom";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

function inspect(range: ByteRange): Tree {
  let magic = range.bytes(0, 4);
  let version = range.bytes(4, 4);
  let length = range.bytes(8, 4);

  let chunks: Array<Tree> = [];
  let start = 12;

  while (start < length.readUIntLE()) {
    let chunkLength = range.bytes(start, 4);
    let chunkType = range.bytes(start + 4, 4);
    let chunkData = range.bytes(start + 8, chunkLength.readUIntLE());

    if (chunkType.readUTF8() === "JSON") {
      let gltf = JSON.parse(chunkData.readUTF8());
    }

    chunks.push(
      new Tree("Chunk", range.bytes(start, 8 + chunkLength.readUIntLE()), [
        new Tree(`Chunk Length: ${chunkLength.readUIntLE()}`, chunkLength),
        new Tree(`Chunk Type: ${chunkType.readUTF8()}`, chunkType),
        new Tree(`Chunk Data`, chunkData)
      ])
    );

    start += 8 + chunkLength.readUIntLE();
  }

  // Create the inspection tree for the floating point.
  return new Tree(`GLB File`, range, [
    new Tree(`Magic: ${magic.readUTF8()}`, magic),
    new Tree(`Version: ${version.readUIntLE()}`, version),
    new Tree(`Length: ${length.readUIntLE()} bytes`, length),
    new Tree(`Chunks`, range.bytes(12, length.readUIntLE() - 12), chunks)
  ]);
}

// We can use the SimpleInspector component to wrap our inspect function.
// Inspectors with special features will need a custom component.
ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
