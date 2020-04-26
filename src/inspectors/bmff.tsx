import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

import { hexEllipsis } from "../core/utils";

type BoxParser = {
  name: string;
  parser: (range: ByteRange) => Array<Tree>;
};

const BOX_PARSERS: Map<string, BoxParser> = new Map();

function inspectCompatibleBrands(range: ByteRange) {
  let brands = range.chunks(4).map(brand => {
    return new Tree(brand.readUTF8(), brand);
  });
  return new Tree(`Compatible Brands`, range, brands);
}

BOX_PARSERS.set("ftyp", {
  name: "File Type Box",
  parser: (range: ByteRange) => {
    let majorBrand = range.bytes(0, 4);
    let minorVersion = range.bytes(4, 4);

    let compatibleBrands = range.bytes(8);

    let elements = [
      new Tree(`Major Brand: ${majorBrand.readUTF8()}`, majorBrand),
      new Tree(`Minor Version: ${minorVersion.readUIntBE()}`, minorVersion)
    ];

    if (compatibleBrands.size() > 0) {
      elements.push(inspectCompatibleBrands(compatibleBrands));
    }

    return elements;
  }
});

BOX_PARSERS.set("free", {
  name: "Free Space Box",
  parser: (range: ByteRange) => {
    return [];
  }
});

function inspectFullBoxFragment(range: ByteRange): Array<Tree> {
  let version = range.bytes(0, 1);
  let flags = range.bytes(1, 3);
  return [
    new Tree(`Version: ${version.readUIntBE()}`, version),
    new Tree(`Flags: ${flags.toHex()}`, flags)
  ];
}

BOX_PARSERS.set("meta", {
  name: "Meta Box",
  parser: (range: ByteRange) => {
    let boxes = inspectBoxes(range.bytes(4));
    return inspectFullBoxFragment(range).concat(boxes);
  }
});

BOX_PARSERS.set("moov", {
  name: "Movie Box",
  parser: (range: ByteRange) => {
    return inspectBoxes(range);
  }
});

BOX_PARSERS.set("trak", {
  name: "Track Box",
  parser: (range: ByteRange) => {
    return inspectBoxes(range);
  }
});

BOX_PARSERS.set("hdlr", {
  name: "Handler Box",
  parser: (range: ByteRange) => {
    let preDefined = range.bytes(4, 4);
    let handlerType = range.bytes(8, 4);
    let reserved = range.bytes(12, 3 * 4);
    // TODO: name
    return inspectFullBoxFragment(range).concat([
      new Tree(`Pre-Defined: ${preDefined.readUIntBE()}`, preDefined),
      new Tree(`Handler Type: ${handlerType.readUTF8()}`, handlerType)
    ]);
  }
});

function inspectBox(range: ByteRange): [ByteRange, Tree] {
  let size = range.bytes(0, 4);
  let type = range.bytes(4, 4);

  if (size.readUIntBE() === 1) {
    throw new Error(`Large size blocks unimplemented.`);
  }

  if (type.readUTF8() === "uuid") {
    throw new Error(`uuid blocks unimplemented.`);
  }

  let boxRange = range.bytes(0, size.readUIntBE());
  let boxData = boxRange.bytes(8);

  let boxParser = BOX_PARSERS.get(type.readUTF8());
  let name = boxParser ? boxParser.name : "Unknown Box";
  let boxElements = boxParser
    ? boxParser.parser(boxData)
    : [new Tree(`Data: ${hexEllipsis(boxData)}`, boxData)];

  return [
    boxRange,
    new Tree(
      name,
      boxRange,
      [
        new Tree(`Size: ${size.readUIntBE()}`, size),
        new Tree(`Type: ${type.readUTF8()}`, type)
      ].concat(boxElements)
    )
  ];
}

function inspectBoxes(range: ByteRange): Array<Tree> {
  let boxes: Array<Tree> = [];

  let ptr = range;
  while (ptr.byteLength > 0) {
    let [boxRange, boxTree] = inspectBox(ptr);

    boxes.push(boxTree);
    ptr = ptr.bytes(boxRange.size());
  }

  return boxes;
}

function inspect(range: ByteRange): Tree {
  return new Tree(`ISO BMFF Container`, range, inspectBoxes(range));
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
