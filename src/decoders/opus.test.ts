import { inspect } from "./opus";
import { base64ToArrayBuffer } from "../core/utils";
import { ByteRange } from "../core/range";

const PACKET_A = base64ToArrayBuffer(
  "S4gvMC0sLyMlgPH9SANsMHykzdeG0IgL2AOMLDZENcJeFbzQNtjpEFr/n+hdoNR2GW/RMhKIa0mDy3V3mkYcHiblcjazYthzd+7bjEX0y/NR8T66tFPxsNqQbafdmTrOWjzwJklaWSCEXAAYoTvZEvE6v+r9Z42VvDd+VkPJafZKZOZyNaiH3I7DSP/eH6GEb0ztpFCKoFrSTtVNf2L/BiyXSjWD9GLrDW2nqTO/H9jJLDq+T1M2O8Ytq7eDorjyX4fya7sOtcmXA32VrYBq98uzZE0RqHo6JGtLKFcYIwOiVgSA3Hr2/ZeYYLQuWBzgKN3WCpwJU9GXx/OAicGwBscuhRN0iY4ybT7fQtsl4F9S5jYkCDU3eC2P0NZgt+7lRax4/gAmQv9PXb2HCSlojEj+3Rl3c7HwHlQtiK2uMP9bwBEUV42ehGybc74i3YrE1c4L5DngOxuhSiSA"
);

const PACKET_B = base64ToArrayBuffer(
  "eC1O601F53FIhPJqoFlaD707r0cmq8YYzkSV7zWNXFc3YgYUc3Qq7IQkAzTIfS3nfPZsFPQVbh7o5NrLeg5DEEuCVh8prlP6"
);

test("inspect", () => {
  let packet_a = new ByteRange(PACKET_A, 0, PACKET_A.byteLength);
  expect(inspect(packet_a)).toMatchSnapshot();

  let packet_b = new ByteRange(PACKET_B, 0, PACKET_B.byteLength);
  expect(inspect(packet_b)).toMatchSnapshot();
});
