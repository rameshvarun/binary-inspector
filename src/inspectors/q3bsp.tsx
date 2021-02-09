import * as React from "react";
import * as ReactDOM from "react-dom";

import { assert } from "chai";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

enum LumpType {
  Entities = 0,
  Textures = 1,
  Planes = 2,
  Nodes = 3,
  Leafs = 4,
  Leaffaces = 5,
  Leafbrushes = 6,
  Models = 7,
  Brushes = 8,
  Brushsides = 9,
  Vertexes = 10,
  Meshverts = 11,
  Effects = 12,
  Faces = 13,
  Lightmaps = 14,
  Lightvols = 15,
  Visdata = 16
}

type Lump = { offset: number; length: number };

function inspectDirectoryEntries(range: ByteRange): [Array<Lump>, Tree] {
  let entries: Array<Tree> = [];
  let lumps: Array<Lump> = [];

  for (let i = 0; i < 17; ++i) {
    let entryRange = range.bytes(i * 8, 8);
    let offset = entryRange.bytes(0, 4);
    let length = entryRange.bytes(4, 4);

    entries.push(
      new Tree(`Directory Entry: ${LumpType[i]}`, entryRange, [
        new Tree(`Offset: ${offset.readUIntLE()}`, offset),
        new Tree(`Length: ${length.readUIntLE()}`, length)
      ])
    );

    lumps.push({
      offset: offset.readUIntLE(),
      length: length.readUIntLE()
    });
  }

  return [lumps, new Tree(`Directory Entries`, range, entries)];
}

function inspectEntities(range: ByteRange): Tree {
  console.log(range.readUTF8());
  return new Tree(`Entities: ${range.readUTF8()}`, range);
}

function inspectTexture(range: ByteRange): Tree {
  let name = range.bytes(0, 64);

  let flags = range.bytes(64, 4);
  let contents = range.bytes(68, 4);

  return new Tree(`Texture: ${name.readUTF8()}`, range, [
    new Tree(`Name: ${name.readUTF8()}`, name),
    new Tree(`Flags: ${flags.readUIntLE()}`, flags),
    new Tree(`Contents: ${contents.readUIntLE()}`, contents)
  ]);
}

function inspectTextures(range: ByteRange): Tree {
  let entrySize = 64 + 4 + 4;
  if (range.size() % entrySize !== 0) throw new Error(`Unexpected size.`);
  return new Tree(
    `Textures`,
    range,
    range.chunks(entrySize).map(inspectTexture)
  );
}

function inspectVector3(name: String, range: ByteRange): Tree {
  let x = range.bytes(0, 4);
  let y = range.bytes(4, 4);
  let z = range.bytes(8, 4);

  return new Tree(
    `${name}: [${x.readFloat32LE()}, ${y.readFloat32LE()}, ${z.readFloat32LE()}]`,
    range,
    [
      new Tree(`x: ${x.readFloat32LE()}`, x),
      new Tree(`y: ${y.readFloat32LE()}`, y),
      new Tree(`z: ${z.readFloat32LE()}`, z)
    ]
  );
}

function inspectPlane(range: ByteRange): Tree {
  let normal = range.bytes(0, 12);
  let dist = range.bytes(12, 4);

  return new Tree(`Plane`, range, [
    inspectVector3("Normal", normal),
    new Tree(`Dist: ${dist.readFloat32LE()}`, dist)
  ]);
}

function inspectPlanes(range: ByteRange): Tree {
  let entrySize = 4 * 3 + 4;
  if (range.size() % entrySize !== 0) throw new Error(`Unexpected size.`);

  return new Tree(`Planes`, range, range.chunks(entrySize).map(inspectPlane));
}

function inspectLightmap(range: ByteRange): Tree {
  return new Tree(`Lightmap`, range, []);
}

function inspectLightmaps(range: ByteRange): Tree {
  let entrySize = 128 * 128 * 3;
  if (range.size() % entrySize !== 0) throw new Error(`Unexpected size.`);

  return new Tree(
    `Lightmaps`,
    range,
    range.chunks(entrySize).map(inspectLightmap)
  );
}

function inspectBoundingBox(range: ByteRange) {
  let min = range.bytes(0, 3 * 4);
  let max = range.bytes(3 * 4, 3 * 4);
  return new Tree(`Bounding Box`, range, [
    inspectVector3("Min", min),
    inspectVector3("Max", max)
  ]);
}

function inspectModel(range: ByteRange): Tree {
  let boundingBox = range.bytes(0, 6 * 4);

  let firstFace = range.bytes(24, 4);
  let numFaces = range.bytes(28, 4);

  let firstBrush = range.bytes(32, 4);
  let numBrushes = range.bytes(36, 4);

  return new Tree(`Model`, range, [
    inspectBoundingBox(boundingBox),
    new Tree(`First Face: ${firstFace.readUIntLE()}`, firstFace),
    new Tree(`Number of Faces: ${numFaces.readUIntLE()}`, numFaces),
    new Tree(`First Brush: ${firstBrush.readUIntLE()}`, firstBrush),
    new Tree(`Number of Brushes: ${numBrushes.readUIntLE()}`, numBrushes)
  ]);
}

function inspectModels(range: ByteRange): Tree {
  let entrySize = 3 * 4 + 3 * 4 + 4 + 4 + 4 + 4;
  if (range.size() % entrySize !== 0) throw new Error(`Unexpected size.`);

  return new Tree(`Models`, range, range.chunks(entrySize).map(inspectModel));
}

function inspect(range: ByteRange): Tree {
  let magic = range.bytes(0, 4);
  let version = range.bytes(4, 4);

  if (magic.readUTF8() !== "IBSP") {
    throw new Error("Invalid magic signature.");
  }
  if (version.readUIntLE() !== 46) {
    throw new Error(
      `Only supports version 46. File is ${version.readUIntLE()}.`
    );
  }

  let [lumps, entries] = inspectDirectoryEntries(range.bytes(8, 17 * 8));

  let lumpRange = (lump: Lump): ByteRange => {
    return range.bytes(lump.offset, lump.length);
  };

  return new Tree("Quake 3 BSP File", range, [
    new Tree(`Magic: ${magic.readUTF8()}`, magic),
    new Tree(`Version (${version.readUIntLE()})`, version),
    entries,
    inspectEntities(lumpRange(lumps[LumpType.Entities])),
    inspectTextures(lumpRange(lumps[LumpType.Textures])),
    inspectPlanes(lumpRange(lumps[LumpType.Planes])),
    inspectLightmaps(lumpRange(lumps[LumpType.Lightmaps])),
    inspectModels(lumpRange(lumps[LumpType.Models]))
  ]);
}

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
