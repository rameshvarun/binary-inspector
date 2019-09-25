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

  toDataView() {
    return new DataView(this.buffer, this.byteStart, this.byteLength);
  }

  toUint8Array() {
    return new Uint8Array(this.buffer, this.byteStart, this.byteLength);
  }

  toHex(): string {
    return Array.from(this.toUint8Array())
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
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

  bits(bitStart: number, bits: number) {
    return new BitRange(this.buffer, this.byteStart * 8 + bitStart, bits);
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

  chunks(size: number): Array<ByteRange> {
    let chunks: Array<ByteRange> = [];
    let cursor = 0;
    while (cursor < this.byteLength) {
      chunks.push(this.bytes(cursor, Math.min(size, this.byteLength - cursor)));
      cursor += size;
    }
    return chunks;
  }
}

/**
 * This represents a range of bits in an ArrayBuffer. Use for reading bitfields.
 */
export class BitRange {
  buffer: ArrayBuffer;
  bitStart: number;
  bits: number;

  constructor(buffer: ArrayBuffer, bitStart: number, bits: number) {
    this.buffer = buffer;
    this.bitStart = bitStart;
    this.bits = bits;
  }

  enclosingByteRange(): ByteRange {
    return new ByteRange(
      this.buffer,
      Math.floor(this.bitStart / 8),
      Math.floor((this.bitStart + this.bits - 1) / 8) + 1
    );
  }

  readBits(): Array<boolean> {
    let bits = this.enclosingByteRange().readBits();
    return bits.slice(this.bitStart, this.bitStart + this.bits);
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
}
