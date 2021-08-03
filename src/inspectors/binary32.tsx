import * as React from "react";
import * as ReactDOM from "react-dom";

import { ByteRange, BitRange } from "../core/range";
import { SimpleInspector } from "../ui/simpleinspector";
import { Tree } from "../core/tree";

// An inspector is defined by a function that takes a `ByteRange` and
// returns a `Tree`. `ByteRange`s wrap buffers and provide helpers
// for decoding data. `ByteRange`s can be sliced into subranges, as well as
// further sliced into a `BitRange`. `Tree`s describe the structure and
// contents of the data.
function inspect(range: ByteRange): Tree {
  // BitRanges for the sign, exponent and fraction.
  let sign = range.bits(0, 1);
  let exponent = range.bits(1, 8);
  let fraction = range.bits(9, 23);

  // The decoded floating point value.
  let decoded = range.readFloat32BE();

  // Create the inspection tree for the floating point.
  return new Tree(`IEEE 754: ${decoded}`, range, [
    new Tree(
      `Sign: ${sign.readUIntBE()} (${sign.readBool() ? "-1" : "+1"})`,
      sign
    ),
    new Tree(
      `Exponent: ${exponent.readUIntBE()} (2^${exponent.readUIntBE() - 127})`,
      exponent
    ),
    new Tree(
      `Fraction: ${fraction.readUIntBE()} (${1 +
        fraction.readUIntBE() / Math.pow(2, 23)})`,
      fraction
    )
  ]);
}

// We can use the SimpleInspector component to wrap our inspect function.
// Inspectors with special features will need a custom component.
ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
