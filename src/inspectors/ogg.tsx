import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

function inspectPage(range: ByteRange): [ByteRange, Tree] {
  let pageStart = range.bytes(0, 4);
  if (pageStart.readUTF8() !== "OggS") {
    throw new Error(`Could not find magic page start header.`);
  }

  let version = range.bytes(4, 1);
  let headerType = range.bytes(5, 1);
  let granulePosition = range.bytes(6, 8);

  let serialNumber = range.bytes(14, 4);

  let sequenceNumber = range.bytes(18, 4);
  let checksum = range.bytes(22, 4);

  let pageSegments = range.bytes(26, 1);

  let lacingValues: Array<ByteRange> = [];
  for (let i = 0; i < pageSegments.readUIntBE(); ++i) {
    lacingValues.push(range.bytes(27 + i, 1));
  }

  let header = range.bytes(0, 27 + pageSegments.readUIntBE());

  let dataSize = lacingValues.reduce((a, b) => a + b.readUIntBE(), 0);
  let page = range.bytes(0, header.size() + dataSize);

  let segments: Array<Tree> = [];
  let ptr = range.bytes(header.size());
  for (let i = 0; i < pageSegments.readUIntBE(); ++i) {
    let segmentSize = lacingValues[i].readUIntBE();
    let segment = ptr.bytes(0, segmentSize);
    segments.push(new Tree(`Segment`, segment));

    ptr = ptr.bytes(segmentSize);
  }

  return [
    page,
    new Tree("Ogg Page", page, [
      new Tree(`Magic Capture: ${pageStart.readUTF8()}`, pageStart),
      new Tree(`Version: ${version.readUIntBE()}`, version),
      new Tree(`Header Type: ${headerType.readUIntBE()}`, headerType),
      new Tree(
        `Granual Position: ${granulePosition.readUIntLE()}`,
        granulePosition
      ),
      new Tree(`Serial Number: ${serialNumber.readUIntLE()}`, serialNumber),
      new Tree(
        `Sequence Number: ${sequenceNumber.readUIntLE()}`,
        sequenceNumber
      ),
      new Tree(`Checksum: ${checksum.readUIntLE()}`, checksum),
      new Tree(
        `Number of Page Segments: ${pageSegments.readUIntBE()}`,
        pageSegments
      ),
      new Tree(
        `Lacing Values`,
        range.bytes(27, pageSegments.readUIntBE()),
        lacingValues.map(r => new Tree(`Lacing Value: ${r.readUIntBE()}`, r))
      ),
      new Tree(`Segments`, range.bytes(header.size(), dataSize), segments)
    ])
  ];
}

function inspect(range: ByteRange): Tree {
  let pages: Array<Tree> = [];

  let ptr = range;
  while (ptr.byteLength > 0) {
    let [pageRange, pageTree] = inspectPage(ptr);

    pages.push(pageTree);
    ptr = ptr.bytes(pageRange.size());
  }

  return new Tree(`Ogg Container`, range, pages);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
