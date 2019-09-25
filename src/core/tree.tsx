import { ByteRange, BitRange } from "./range";

export class Tree {
  label: string;
  range: ByteRange | BitRange;
  children: Array<Tree>;

  constructor(
    label: string,
    range: ByteRange | BitRange,
    children: Array<Tree> = []
  ) {
    this.label = label;
    this.range = range;
    this.children = children;
  }
}
