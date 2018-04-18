/* eslint-disable no-undef */

import { round, percent } from "../number";

describe("round", () => {
  test("(42.4242, 2) should returns 42.42", () => {
    expect(round(42.4242, 2)).toBe(42.42);
  });

  test("(42.4272, 2) should returns 42.43", () => {
    expect(round(42.427, 2)).toBe(42.43);
  });

  test("(42.424242, 1) should returns 42.4", () => {
    expect(round(42.424242, 1)).toBe(42.4);
  });
});

describe("percent", () => {
  test("(25, 100) should returns 25", () => {
    expect(percent(25, 100)).toBe(25);
  });

  test("(50, 200) should returns 25", () => {
    expect(percent(50, 200)).toBe(25);
  });

  test("(24, 42) should returns 57.1", () => {
    expect(percent(24, 42)).toBe(57.1);
  });
});
