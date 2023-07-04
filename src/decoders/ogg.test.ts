import { ByteRange } from "../core/range";
import { base64ToArrayBuffer } from "../core/utils";
import { inspect } from "./ogg";
import "fast-text-encoding";

import * as fs from "fs";
import * as path from "path";

const OGG_OPUS = base64ToArrayBuffer(
  "T2dnUwACAAAAAAAAAABIr0TBAAAAAKPjpjgBE09wdXNIZWFkAQE4AUAfAAAAAABPZ2dTAAAAAAAAAAAAAEivRMEBAAAAMsqQUwE/T3B1c1RhZ3MNAAAATGF2ZjU4Ljc2LjEwMAEAAAAeAAAAZW5jb2Rlcj1MYXZjNTguMTM0LjEwMCBsaWJvcHVzT2dnUwAAgLsAAAAAAABIr0TBAgAAANJg4WkyAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOY//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//6Y//5PZ2dTAAS4vAAAAAAAAEivRMEDAAAABbaDBQEDmP/+"
);

test("inspect an Ogg Opus file", () => {
  let ogg = new ByteRange(OGG_OPUS, 0, OGG_OPUS.byteLength);
  expect(inspect(ogg)).toMatchSnapshot();
});

test("Ogg Opus high-bitrate noise", () => {
  let data = fs.readFileSync(path.join(__dirname, "__files__", "noise.opus"));
  let range = new ByteRange(data.buffer, data.byteOffset, data.byteLength);
  expect(inspect(range)).toMatchSnapshot();
});
