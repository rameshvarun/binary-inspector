import { ByteRange, BitRange } from "./range.ts";

export class Tree {
  label: string;
  range: ByteRange | BitRange;
  children: Array<Tree>;

  constructor(
    label: string,
    range: ByteRange | BitRange,
    children: Array<Tree> = []
  ): range {
    this.label = label;
    this.range = range;
    this.children = children;
  }
}
