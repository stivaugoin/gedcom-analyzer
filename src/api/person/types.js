// @flow

import type { Parent, Wedding } from "../family/types";
import type { Place } from "../place/types";
import type { Source } from "../source/types";

type Residence = {
  place?: Place,
  date?: string,
  source?: Source,
};

type Person = {
  pointer: string,
  sex: string,
  names: Array<{ fname: string, lname: string }>,
  name: string,
  fname: string,
  lname: string,
  birth: { date?: string, place?: Place },
  buried: { date?: string, place?: Place },
  baptism: { date?: string, place?: Place },
  death: { date?: string, place?: Place },
  age: number | null,
  residences: Array<Residence>,
  weddings: Array<Wedding>,
  children: Array<string>,
  parents: Array<Parent>,
};

export type { Person, Residence };
