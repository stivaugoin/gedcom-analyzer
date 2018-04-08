import { findTags } from "./helpers";

class Source {
  source: any;

  constructor(source: any) {
    this.source = source;
  }

  get pointer(): string {
    return this.source.pointer.slice(1, -1);
  }

  get name(): string {
    const tags = findTags(this.source.tree, "TITL");
    if (!tags || tags.length === 0 || !tags[0] || !tags[0].data) {
      return "";
    }

    return tags[0].data;
  }
}

export default Source;
