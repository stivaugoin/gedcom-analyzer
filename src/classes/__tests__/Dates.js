/* eslint-disable no-undef */

import Dates from "../Dates";

describe("Class - Dates", () => {
  const tests = [
    { in: "24 april 1942", out: "1942-04-24" },
    { in: "april 1942", out: "1942-04-01" },
    { in: "1942", out: "1942-01-01" },
    { in: "abt 1942", out: "1942-01-01" },
    { in: "1942", out: "1942-01-01" },
    // TODO: Make it pass
    // { in: "1942-04-24", out: "1942-04-24" },
  ];

  describe("format()", () => {
    tests.forEach(t => {
      test(`"${t.in}" should returns "${t.out}"`, () => {
        expect(new Dates(t.in).format()).toBe(t.out);
      });
    });
  });
});
