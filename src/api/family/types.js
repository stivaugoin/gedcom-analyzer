// @flow

import type { Place } from "../place/types";

type Parent = {
  pointer: string,
  relation: "father" | "mother",
};

type Wedding = {
  pointer?: string,
  date?: string,
  place?: Place,
  husband?: string,
  wife?: string,
  spouse?: string,
};

export type { Parent, Wedding };
