import { inspect } from "./opus";
import { base64ToArrayBuffer } from "../core/utils";
import { ByteRange } from "../core/range";

const OPUS_PACKET = base64ToArrayBuffer(
  "S4gvMC0sLyMlgPH9SANsMHykzdeG0IgL2AOMLDZENcJeFbzQNtjpEFr/n+hdoNR2GW/RMhKIa0mDy3V3mkYcHiblcjazYthzd+7bjEX0y/NR8T66tFPxsNqQbafdmTrOWjzwJklaWSCEXAAYoTvZEvE6v+r9Z42VvDd+VkPJafZKZOZyNaiH3I7DSP/eH6GEb0ztpFCKoFrSTtVNf2L/BiyXSjWD9GLrDW2nqTO/H9jJLDq+T1M2O8Ytq7eDorjyX4fya7sOtcmXA32VrYBq98uzZE0RqHo6JGtLKFcYIwOiVgSA3Hr2/ZeYYLQuWBzgKN3WCpwJU9GXx/OAicGwBscuhRN0iY4ybT7fQtsl4F9S5jYkCDU3eC2P0NZgt+7lRax4/gAmQv9PXb2HCSlojEj+3Rl3c7HwHlQtiK2uMP9bwBEUV42ehGybc74i3YrE1c4L5DngOxuhSiSA"
);

test("inspect", () => {
  let data = new ByteRange(OPUS_PACKET, 0, OPUS_PACKET.byteLength);
  expect(inspect(data)).toMatchObject({
    label: "Opus Packet",
    range: {
      byteStart: 0,
      byteLength: 348
    },
    children: [
      {
        label: "Config: 9 (SILK-only, WB, 20ms)",
        range: {
          bitStart: 0,
          bits: 5
        },
        children: [
          {
            label: "Mode: SILK-only",
            range: {
              bitStart: 0,
              bits: 5
            },
            children: []
          },
          {
            label: "Bandwidth: WB (8000Hz), Sample Rate: 16000Hz",
            range: {
              bitStart: 0,
              bits: 5
            },
            children: []
          },
          {
            label: "Frame Size: 20ms",
            range: {
              bitStart: 0,
              bits: 5
            },
            children: []
          }
        ]
      },
      {
        label: "Channels: Mono",
        range: {
          bitStart: 5,
          bits: 1
        },
        children: []
      },
      {
        label: "Frame Packing Mode: 3 (Arbitrary Frames)",
        range: {
          bitStart: 6,
          bits: 2
        },
        children: []
      },
      {
        label: "Compressed Frames",
        range: {
          byteStart: 1,
          byteLength: 347
        },
        children: []
      }
    ]
  });
});
