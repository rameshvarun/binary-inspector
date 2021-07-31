import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";

import * as opus from "./opus";

interface StreamParser {
  inspectPage(data: ByteRange, segments: Array<ByteRange>): Tree;
}

class OpusStreamParser implements StreamParser {
  state: "pre-header" | "pre-comments" | "packets" = "pre-header";
  inspectPage(range: ByteRange, segments: Array<ByteRange>): Tree {
    if (this.state == "pre-header") {
      this.state = "pre-comments";

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
    } else if (this.state === "pre-comments") {
      this.state = "packets";
      let signature = range.bytes(0, 8);

      let vendorStringLength = range.bytes(8, 4);
      let vendorString = range.bytes(12, vendorStringLength.readUIntLE());

      let userCommentListLength = range.bytes(
        12 + vendorStringLength.readUIntLE(),
        4
      );

      let userCommentsRange = range.bytes(
        12 + vendorStringLength.readUIntLE() + 4
      );
      let ptr = userCommentsRange;
      let userComments: Array<Tree> = [];
      for (let i = 0; i < userCommentListLength.readUIntLE(); ++i) {
        let commentLength = ptr.bytes(0, 4);
        let commentString = ptr.bytes(4, commentLength.readUIntLE());

        userComments.push(
          new Tree(
            `User Comment #${i + 1} Length: ${commentLength.readUIntLE()}`,
            commentLength
          )
        );
        userComments.push(
          new Tree(
            `User Comment #${i + 1}: ${commentString.readUTF8()}`,
            commentString
          )
        );

        ptr = ptr.bytes(4 + commentLength.readUIntLE());
      }

      return new Tree("Comment Header", range, [
        new Tree(`Magic Signature: ${signature.readUTF8()}`, signature),
        new Tree(
          `Vendor String Length: ${vendorStringLength.readUIntLE()}`,
          vendorStringLength
        ),
        new Tree(`Vendor String: ${vendorString.readUTF8()}`, vendorString),
        new Tree(
          `User Comment List Length: ${userCommentListLength.readUIntLE()}`,
          userCommentListLength
        ),
        new Tree(`User Comments`, userCommentsRange, userComments)
      ]);
    } else if (this.state === "packets") {
      return new Tree(
        "Opus Packets",
        range,
        segments.map(segment => opus.inspect(segment))
      );
    }

    return new Tree("Unimplemented", range, [], new Error());
  }
}

// Specification at https://www.theora.org/doc/Theora.pdf
class TheoraStreamParser implements StreamParser {
  state: "pre-header" | "pre-comments" = "pre-header";
  inspectPage(range: ByteRange): Tree {
    if (this.state == "pre-header") {
      this.state = "pre-comments";

      let headerType = range.bytes(0, 1);
      let headerMagic = range.bytes(1, 6);

      let version = range.bytes(7, 3);
      let vmaj = range.bytes(7, 1);
      let vmin = range.bytes(8, 1);
      let vrev = range.bytes(9, 1);

      let fmbw = range.bytes(10, 2);
      let fmbh = range.bytes(12, 2);

      let picw = range.bytes(14, 3);
      let pich = range.bytes(17, 3);

      let picx = range.bytes(20, 1);
      let picy = range.bytes(21, 1);

      let framerate = range.bytes(22, 8);
      let frn = range.bytes(22, 4);
      let frd = range.bytes(26, 4);

      let pixelar = range.bytes(30, 6);
      let parn = range.bytes(30, 3);
      let pard = range.bytes(33, 3);

      let cs = range.bytes(36, 1);
      let nombr = range.bytes(37, 3);

      let packed = range.bytes(40, 2);
      let qual = packed.bits(0, 6);
      let kfgshift = packed.bits(6, 5);
      let pf = packed.bits(11, 2);
      let res = packed.bits(13, 3);

      return new Tree("Theora Identification Header", range, [
        new Tree(`Header Type: ${headerType.toHex()}`, headerType),
        new Tree(`Header Magic: ${headerMagic.readUTF8()}`, headerMagic),

        new Tree(
          `Version: ${vmaj.readUIntBE()}.${vmaj.readUIntBE()}.${vmaj.readUIntBE()}`,
          version,
          [
            new Tree(`Major Version: ${vmaj.readUIntBE()}`, vmaj),
            new Tree(`Minor Version: ${vmaj.readUIntBE()}`, vmin),
            new Tree(`Revision Version: ${vmaj.readUIntBE()}`, vrev)
          ]
        ),

        new Tree(`Frame Width (Macro Blocks): ${fmbw.readUIntBE()}`, fmbw),
        new Tree(`Frame Height (Macro Blocks): ${fmbh.readUIntBE()}`, fmbh),

        new Tree(`Picture Width (pixels): ${picw.readUIntBE()}`, picw),
        new Tree(`Picture Height (pixels): ${pich.readUIntBE()}`, pich),

        new Tree(`Picture Offset X (pixels): ${picx.readUIntBE()}`, picx),
        new Tree(`Picture Offset Y (pixels): ${picy.readUIntBE()}`, picy),

        new Tree(
          `Framerate: ${frn.readUIntBE() / frd.readUIntBE()}`,
          framerate,
          [
            new Tree(`Framerate Numerator: ${frn.readUIntBE()}`, frn),
            new Tree(`Framerate Denominator: ${frd.readUIntBE()}`, frd)
          ]
        ),

        new Tree(
          `Pixel Aspect Ratio: ${parn.readUIntBE() / pard.readUIntBE()}`,
          pixelar,
          [
            new Tree(
              `Pixel Aspect Ratio Numerator: ${parn.readUIntBE()}`,
              parn
            ),
            new Tree(
              `Pixel Aspect Ratio Denominator: ${pard.readUIntBE()}`,
              pard
            )
          ]
        ),

        new Tree(`Color Space: ${cs.readUIntBE()}`, cs),
        new Tree(`Nominal Bitrate: ${nombr.readUIntBE()}`, nombr),

        new Tree(`Quality Hint: ${qual.readUIntBE()}`, qual),
        new Tree(`Keyframe Granule Shift: ${kfgshift.readUIntBE()}`, kfgshift),
        new Tree(`Pixel Format: ${pf.readUIntBE()}`, pf)
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

  let segments: Array<ByteRange> = [];
  let ptr = range.bytes(header.size());
  for (let i = 0; i < pageSegments.readUIntBE(); ++i) {
    let segmentSize = lacingValues[i].readUIntBE();
    let segment = ptr.bytes(0, segmentSize);
    segments.push(segment);

    ptr = ptr.bytes(segmentSize);
  }

  // Look for stream headers.
  if (pageData.size() >= 8 && pageData.bytes(0, 8).readUTF8() === "OpusHead") {
    streams.set(serialNumber.readUIntLE(), new OpusStreamParser());
  } else if (
    pageData.size() >= 7 &&
    pageData.bytes(0, 1).readUIntBE() === 128 &&
    pageData.bytes(1, 6).readUTF8() === "theora"
  ) {
    streams.set(serialNumber.readUIntLE(), new TheoraStreamParser());
  }

  let dataTree = new Tree(`Page Data`, pageData);
  if (streams.has(serialNumber.readUIntLE())) {
    dataTree = streams
      .get(serialNumber.readUIntLE())!
      .inspectPage(pageData, segments);
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
      new Tree(
        `Segments`,
        range.bytes(header.size(), dataSize),
        segments.map(segment => new Tree("Segment", segment))
      ),
      dataTree
    ])
  ];
}

export function inspect(range: ByteRange): Tree {
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
