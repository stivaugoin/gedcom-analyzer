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

const january = ["janvier", "jan", "january"];
const february = ["fevrier", "fevr", "fev", "feb", "febr", "february"];
const march = ["mars", "mar", "march"];
const april = ["avril", "avr", "apr", "april"];
const may = ["mai", "may"];
const june = ["juin", "june", "jun"];
const july = ["juillet", "jui", "juil", "july", "jul"];
const august = ["aout", "aou", "august", "aug"];
const september = ["septembre", "sept", "september", "sep"];
const october = ["octobre", "oct", "october"];
const november = ["novembre", "nov", "november"];
const december = ["decembre", "dec", "december"];

const months = [
  ...january,
  ...february,
  ...march,
  ...april,
  ...may,
  ...june,
  ...july,
  ...august,
  ...september,
  ...october,
  ...november,
  ...december,
];

describe("isMonth", () => {
  months.forEach(month => {
    test(`"${month}" should returns true`, () => {
      expect(isMonth(month)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isMonth("gedcom")).toBe(false);
  });
});

describe("isJanuary", () => {
  january.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isJanuary(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isJanuary("gedcom")).toBe(false);
  });
});

describe("isFebruary", () => {
  february.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isFebruary(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isFebruary("gedcom")).toBe(false);
  });
});

describe("isMarch", () => {
  march.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isMarch(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isMarch("gedcom")).toBe(false);
  });
});

describe("isApril", () => {
  april.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isApril(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isApril("gedcom")).toBe(false);
  });
});

describe("isMay", () => {
  may.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isMay(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isMay("gedcom")).toBe(false);
  });
});

describe("isJune", () => {
  june.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isJune(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isJune("gedcom")).toBe(false);
  });
});

describe("isJuly", () => {
  july.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isJuly(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isJuly("gedcom")).toBe(false);
  });
});

describe("isAugust", () => {
  august.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isAugust(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isAugust("gedcom")).toBe(false);
  });
});

describe("isSeptember", () => {
  september.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isSeptember(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isSeptember("gedcom")).toBe(false);
  });
});

describe("isOctober", () => {
  october.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isOctober(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isOctober("gedcom")).toBe(false);
  });
});

describe("isNovember", () => {
  november.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isNovember(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isNovember("gedcom")).toBe(false);
  });
});

describe("isDecember", () => {
  december.forEach(element => {
    test(`"${element}" should returns true`, () => {
      expect(isDecember(element)).toBe(true);
    });
  });

  test('"gedcom" should returns false', () => {
    expect(isDecember("gedcom")).toBe(false);
  });
});
