import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";

export function inspect(range: ByteRange): Tree {
  let blocks: Array<Tree> = [];

  let header = range;
  while (true) {
    let f = header.bits(0, 1);
    let pt = header.bits(1, 7);

    if (f.readBool()) {
      let timestampOffset = header.bits(8, 14);
      let blockLength = header.bits(22, 10);
      blocks.push(
        new Tree(`Block`, header, [
          new Tree(`F: ${f.readBool()}`, f),
          new Tree(`Payload Type: ${pt.readUIntBE()}`, pt),
          new Tree(
            `Timestamp Offset: ${timestampOffset.readUIntBE()}`,
            timestampOffset
          ),
          new Tree(
            `Block Length: ${blockLength.readUIntBE()} bytes`,
            blockLength
          )
        ])
      );

      header = header.bytes(4);
    } else {
      let f = header.bits(0, 1);
      let pt = header.bits(1, 7);

      blocks.push(
        new Tree(`Block (Primary Encoding)`, header, [
          new Tree(`F: ${f.readBool()}`, f),
          new Tree(`Payload Type: ${pt.readUIntBE()}`, pt)
        ])
      );
      break;
    }
  }

  return new Tree(`Red Packet`, range, blocks);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
