/* eslint-disable no-undef */

import { getClassNamePercent } from "../colors";

describe("getClassNamePercent", () => {
  test('more than 75 should returns "color-color-scheme"', () => {
    expect(getClassNamePercent(75)).toBe("color-color-scheme");
    expect(getClassNamePercent(80)).toBe("color-color-scheme");
    expect(getClassNamePercent(100)).toBe("color-color-scheme");
  });

  test('between 50 and 74 should returns "color-warning"', () => {
    expect(getClassNamePercent(50)).toBe("color-warning");
    expect(getClassNamePercent(65)).toBe("color-warning");
    expect(getClassNamePercent(74)).toBe("color-warning");
  });

  test('between 25 and 49 should returns "color-orange"', () => {
    expect(getClassNamePercent(25)).toBe("color-orange");
    expect(getClassNamePercent(35)).toBe("color-orange");
    expect(getClassNamePercent(49)).toBe("color-orange");
  });

  test('less than 24 should returns "color-red"', () => {
    expect(getClassNamePercent(24)).toBe("color-red");
    expect(getClassNamePercent(10)).toBe("color-red");
    expect(getClassNamePercent(0)).toBe("color-red");
    expect(getClassNamePercent(-10)).toBe("color-red");
  });
});
