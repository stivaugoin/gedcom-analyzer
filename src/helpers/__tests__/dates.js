/* eslint-disable no-undef */

import {
  isYear,
  isMonth,
  isDay,
  isJanuary,
  isFebruary,
  isMarch,
  isApril,
  isMay,
  isJune,
  isJuly,
  isAugust,
  isSeptember,
  isOctober,
  isNovember,
  isDecember,
} from "../dates";

describe("isYear", () => {
  test('"1985" should returns true', () => {
    expect(isYear("1985")).toBe(true);
  });

  test('"85" should returns false', () => {
    expect(isYear("85")).toBe(false);
  });
});
