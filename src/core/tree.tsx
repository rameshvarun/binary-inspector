import { ByteRange, BitRange } from "./range";

export class Tree {
  label: string;
  range: ByteRange | BitRange;
  children: Array<Tree>;
  error?: Error;

  constructor(
    label: string,
    range: ByteRange | BitRange,
    children: Array<Tree> = [],
    error?: Error
  ) {
    this.label = label;
    this.range = range;
    this.children = children;
    this.error = error;
  }
}
