// @flow

type Wedding = {
  pointer?: string,
  date?: ?string,
  place?: ?string,
  husband?: string,
  wife?: string,
  spouse?: string,
};

type Weddings = Array<Wedding>;

type Person = {
  pointer: string,
  sex: string,
  names: Array<{ fname: string, lname: string }>,
  name: string,
  fname: string,
  lname: string,
  birth: { date?: string, place?: string },
  death: { date?: string, place?: string },
  age: number | null,
  residences: Array<{}>,
  weddings: Weddings,
  children: Array<string>,
  parents: Array<{ pointer: string, relation: "father" | "mother" }>,
};

export type { Person, Wedding, Weddings };
