import {
  hexToArrayBuffer,
  arrayBufferToBase64,
  base64ToArrayBuffer
} from "./utils";

let TEST_BUFFER = new Uint8Array([
  0x4b,
  0x88,
  0x2f,
  0x30,
  0x2d,
  0x2c,
  0x2f,
  0x23
]).buffer;

test("hexToArrayBuffer", () => {
  expect(
    hexToArrayBuffer("0x4b 0x88 0x2f 0x30 0x2d 0x2c 0x2f 0x23")
  ).toStrictEqual(TEST_BUFFER);
  expect(hexToArrayBuffer("4b 88 2f 30 2d 2c 2f 23")).toStrictEqual(
    TEST_BUFFER
  );
  expect(hexToArrayBuffer("4b882f302d2c2f23")).toStrictEqual(TEST_BUFFER);
});

test("arrayBufferToBase64", () => {
  expect(arrayBufferToBase64(TEST_BUFFER)).toStrictEqual("S4gvMC0sLyM=");
});

test("base64ToArrayBuffer", () => {
  expect(base64ToArrayBuffer("S4gvMC0sLyM=")).toStrictEqual(TEST_BUFFER);
});
