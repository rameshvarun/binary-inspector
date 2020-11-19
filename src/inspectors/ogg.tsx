import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

interface StreamParser {
  inspectPage(data: ByteRange): Tree;
}

class OpusStreamParser implements StreamParser {
  state: "pre-header" | "comments" | "packet" = "pre-header";
  inspectPage(range: ByteRange): Tree {
    if (this.state == "pre-header") {
      this.state = "comments";

      let signature = range.bytes(0, 8);
      let version = range.bytes(8, 1);

      let channels = range.bytes(9, 1);
      let preSkip = range.bytes(10, 2);

      let sampleRate = range.bytes(12, 4);
      let outputGain = range.bytes(16, 2);
      let mappingFamily = range.bytes(18, 1);

      return new Tree("Opus Header", range, [
        new Tree(`Magic Signature: ${signature.readUTF8()}`, signature),
        new Tree(`Version: ${version.readUIntLE()}`, version),
        new Tree(`Channel Count: ${channels.readUIntLE()}`, channels),
        new Tree(`Pre-skip: ${preSkip.readUIntLE()}`, preSkip),
        new Tree(`Input Sample Rate: ${sampleRate.readUIntLE()}`, sampleRate),
        new Tree(`Output Gain: ${outputGain.readUIntLE()}`, outputGain),
        new Tree(`Mapping Family: ${mappingFamily.readUIntLE()}`, mappingFamily)
      ]);
    }
    return new Tree("Unimplemented", range, [], new Error());
  }
}

function inspectPage(
  streams: Map<number, StreamParser>,
  range: ByteRange
): [ByteRange, Tree] {
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
  let pageData = range.bytes(header.size(), dataSize);

  let segments: Array<Tree> = [];
  let ptr = range.bytes(header.size());
  for (let i = 0; i < pageSegments.readUIntBE(); ++i) {
    let segmentSize = lacingValues[i].readUIntBE();
    let segment = ptr.bytes(0, segmentSize);
    segments.push(new Tree(`Segment`, segment));

    ptr = ptr.bytes(segmentSize);
  }

  // Look for stream headers.
  if (pageData.size() >= 8 && pageData.bytes(0, 8).readUTF8() === "OpusHead") {
    streams.set(serialNumber.readUIntLE(), new OpusStreamParser());
  }

  let dataTree = new Tree(`Page Data`, pageData);
  if (streams.has(serialNumber.readUIntLE())) {
    dataTree = streams.get(serialNumber.readUIntLE())!.inspectPage(pageData);
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
      new Tree(`Segments`, range.bytes(header.size(), dataSize), segments),
      dataTree
    ])
  ];
}

function inspect(range: ByteRange): Tree {
  let streams: Map<number, StreamParser> = new Map();
  let pages: Array<Tree> = [];

  let ptr = range;
  while (ptr.byteLength > 0) {
    let [pageRange, pageTree] = inspectPage(streams, ptr);

    pages.push(pageTree);
    ptr = ptr.bytes(pageRange.size());
  }

  return new Tree(`Ogg Container`, range, pages);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
