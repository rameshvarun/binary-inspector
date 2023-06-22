import { ByteRange, BitRange } from "./range";
import { Color } from "./color";

export class Tree {
  label: string;
  range: ByteRange | BitRange;
  children: Array<Tree>;
  error?: Error;
  color: Color;

  parent?: Tree;

  constructor(
    label: string,
    range: ByteRange | BitRange,
    children: Array<Tree> = [],
    error?: Error,
    color?: Color
  ) {
    this.label = label;
    this.range = range;
    this.children = children;
    this.error = error;
    this.color = color || Color.default();

    // Set parent pointers for the children tree objects.
    for (let child of this.children) {
      child.parent = this;
    }
  }

  isChildOf(other: Tree): boolean {
    let current: Tree | undefined = this;

    while (current !== undefined) {
      if (current === other) return true;
      current = current.parent;
    }
    return false;
  }

  isParentOf(other: Tree): boolean {
    return other.isChildOf(this);
  }

  withColor(color: Color): Tree {
    this.color = color;

    return this;
  }
}
