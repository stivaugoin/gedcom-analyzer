// @flow

class Tree {
  raw: Array<{}>;

  constructor(raw: Array<{}>) {
    this.raw = raw;
  }

  get people(): Array<{}> {
    return this.raw.filter(r => r.tag === "INDI");
  }

  get families(): Array<{}> {
    return this.raw.filter(r => r.tag === "FAM");
  }

  get sources(): Array<{}> {
    return this.raw.filter(r => r.tag === "SOUR");
  }
}

export default Tree;
