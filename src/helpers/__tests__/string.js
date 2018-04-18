/* eslint-disable no-undef */

import { capitalize } from "../string";

describe("capitalize", () => {
  test('"GEDCOM" should returns "GEDCOM', () => {
    expect(capitalize("GEDCOM")).toBe("GEDCOM");
  });

  test('"gedcom" should returns "Gedcom', () => {
    expect(capitalize("gedcom")).toBe("Gedcom");
  });

  test('"gedCom" should returns "GedCom', () => {
    expect(capitalize("gedCom")).toBe("GedCom");
  });
});
