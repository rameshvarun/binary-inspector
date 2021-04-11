import { assert } from "chai";

/**
 * This represents a byte range in an ArrayBuffer. This can be used to read out
 * data as well as for highlighting regions in the BinaryView.
 */
export class ByteRange {
  buffer: ArrayBuffer;
  byteStart: number;
  byteLength: number;

  constructor(buffer: ArrayBuffer, byteStart: number, byteLength: number) {
    this.buffer = buffer;
    this.byteStart = byteStart;
    this.byteLength = byteLength;
  }

  size(): number {
    return this.byteLength;
  }

  toDataView() {
    return new DataView(this.buffer, this.byteStart, this.byteLength);
  }

  toUint8Array() {
    return new Uint8Array(this.buffer, this.byteStart, this.byteLength);
  }

  readUTF8() {
    let utf8decoder = new TextDecoder();
    return utf8decoder.decode(this.toUint8Array());
  }

  toHex(): string {
    return Array.from(this.toUint8Array())
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  contains(other: ByteRange) {
    return (
      other.byteStart >= this.byteStart &&
      other.byteStart + other.byteLength <= this.byteStart + this.byteLength
    );
  }

  bytes(byteStart: number, byteLength?: number) {
    if (byteLength == null) {
      byteLength = this.byteLength - byteStart;
    }

    if (byteStart < 0)
      throw new Error(`byteStart is ${byteStart}, but should be non-negative.`);
    if (byteStart + byteLength > this.byteLength)
      throw new Error(`New subrange does not fit within current subrange.`);

    return new ByteRange(this.buffer, this.byteStart + byteStart, byteLength);
  }

  bits(bitStart: number, bits?: number) {
    let actualBitStart = this.byteStart * 8 + bitStart;
    if (bits === undefined) {
      bits = (this.byteStart + this.byteLength) * 8 - actualBitStart;
    }

    return new BitRange(this.buffer, actualBitStart, bits);
  }

  readBits(): Array<boolean> {
    let bits: Array<boolean> = [];
    let bytes = this.toUint8Array();
    while (bits.length < this.byteLength * 8) {
      let byte = bytes[Math.floor(bits.length / 8)];
      let pos = bits.length % 8;

      bits.push(((byte << pos) & 128) === 128);
    }
    return bits;
  }

  readUIntBE(): number {
    return this.bits(0, this.byteLength * 8).readUIntBE();
  }

  readUIntLE(): number {
    let number = 0;
    let bytes = this.toUint8Array();
    for (let i = 0; i < bytes.length; ++i) {
      number += bytes[i] * Math.pow(2, i * 8);
    }
    return number;
  }

  readFloat32LE(): number {
    return this.toDataView().getFloat32(0, true);
  }

  readFloat32BE(): number {
    return this.toDataView().getFloat32(0, false);
  }

  readFloat64BE(): number {
    return this.toDataView().getFloat64(0, false);
  }

  chunks(size: number): Array<ByteRange> {
    let chunks: Array<ByteRange> = [];
    let cursor = 0;
    while (cursor < this.byteLength) {
      chunks.push(this.bytes(cursor, Math.min(size, this.byteLength - cursor)));
      cursor += size;
    }
    return chunks;
  }

  merge(other: ByteRange): ByteRange {
    assert.equal(
      this.buffer,
      other.buffer,
      "Can only merge ranges over the same buffer."
    );
    let start = Math.min(this.byteStart, other.byteStart);
    let end = Math.max(
      this.byteStart + this.byteLength,
      other.byteStart + other.byteLength
    );

    return new ByteRange(this.buffer, start, end - start);
  }
}

/**
 * This represents a range of bits in an ArrayBuffer. Use for reading bitfields.
 */
export class BitRange {
  buffer: ArrayBuffer;
  bitStart: number;
  bitLength: number;

  constructor(buffer: ArrayBuffer, bitStart: number, bitLength: number) {
    this.buffer = buffer;
    this.bitStart = bitStart;
    this.bitLength = bitLength;
  }

  enclosingByteRange(): ByteRange {
    let byteStart = Math.floor(this.bitStart / 8);
    let byteEnd = Math.floor((this.bitStart + this.bitLength - 1) / 8) + 1;
    return new ByteRange(this.buffer, byteStart, byteEnd - byteStart);
  }

  readBits(): Array<boolean> {
    let enclosingByteRange = this.enclosingByteRange();
    let bits = enclosingByteRange.readBits();

    let start = this.bitStart - enclosingByteRange.byteStart * 8;
    return bits.slice(start, start + this.bitLength);
  }

  readUIntBE(): number {
    let number = 0;
    let bits = this.readBits();
    for (let i = 0; i < bits.length; ++i) {
      if (bits[bits.length - 1 - i]) number += Math.pow(2, i);
    }
    return number;
  }

  readBool(): boolean {
    let bits = this.readBits();
    assert.equal(bits.length, 1);
    return bits[0];
  }

  bits(bitStart: number, bitLength?: number): BitRange {
    if (bitLength == null) {
      bitLength = this.bitLength - bitStart;
    }

    return new BitRange(this.buffer, this.bitStart + bitStart, bitLength);
  }

  chunks(size: number): Array<BitRange> {
    let chunks: Array<BitRange> = [];
    let cursor = 0;
    while (cursor < this.bitLength) {
      chunks.push(this.bits(cursor, Math.min(size, this.bitLength - cursor)));
      cursor += size;
    }
    return chunks;
  }

  contains(other: BitRange) {
    return (
      other.bitStart >= this.bitStart &&
      other.bitStart + other.bitLength <= this.bitStart + this.bitLength
    );
  }
}
