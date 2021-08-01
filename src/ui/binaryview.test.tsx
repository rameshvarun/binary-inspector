import { BinaryView } from "./binaryview";
import { create } from "react-test-renderer";
import { ByteRange } from "../core/range";
import * as React from "react";

function makeTestBuffer(size: number): ArrayBuffer {
  const array = new Uint8Array(size);
  for (let i = 0; i < array.length; ++i) {
    array[i] = i;
  }
  return array.buffer;
}

const SHORT_SEQUENCE = makeTestBuffer(16 * 2);
const SHORT_SEQUENCE_UNALIGNED = makeTestBuffer(16 * 2 - 4);
const LONG_SEQUENCE = makeTestBuffer(16 * 5);

it("renders a short sequence of hex bytes", () => {
  const data = new ByteRange(SHORT_SEQUENCE, 0, SHORT_SEQUENCE.byteLength);
  const tree = create(<BinaryView data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a short sequence of unaligned hex bytes", () => {
  const data = new ByteRange(
    SHORT_SEQUENCE_UNALIGNED,
    0,
    SHORT_SEQUENCE_UNALIGNED.byteLength
  );
  const tree = create(<BinaryView data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a long sequence of hex bytes with slicing", () => {
  const data = new ByteRange(LONG_SEQUENCE, 0, LONG_SEQUENCE.byteLength);
  const tree = create(
    <BinaryView data={data} maxRows={3} selected={data.bytes(2 * 16, 16)} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
