// @flow

import { findTags, getEventDetails } from "./helpers";

import type { Parent, Wedding } from "../api/family/types";

class Family {
  family: any;

  constructor(family: any) {
    this.family = family;
  }

  get pointer(): string {
    return this.family.pointer.slice(1, -1);
  }

  get wedding(): Wedding {
    const weddings = findTags(this.family.tree, "MARR")[0];

    if (!weddings || Object.keys(weddings).length === 0) {
      return {};
    }

    const husbandPointer = findTags(this.family.tree, "HUSB")[0].data;
    const wifePointer = findTags(this.family.tree, "WIFE")[0].data;

    return {
      pointer: this.pointer,
      ...getEventDetails(weddings.tree),
      husband: husbandPointer.slice(1, -1),
      wife: wifePointer.slice(1, -1),
    };
  }

  get children(): Array<string> {
    const children = findTags(this.family.tree, "CHIL");

    if (!children || children.length === 0) {
      return [];
    }

    return children.map(child => child.data.slice(1, -1));
  }

  get parents(): Array<Parent> {
    const result = [];

    const tagHusb = findTags(this.family.tree, "HUSB")[0];
    if (tagHusb && tagHusb.data) {
      result.push({
        relation: "father",
        pointer: tagHusb.data.slice(1, -1),
      });
    }

    const tagWife = findTags(this.family.tree, "WIFE")[0];
    if (tagWife && tagWife.data) {
      result.push({
        relation: "mother",
        pointer: tagWife.data.slice(1, -1),
      });
    }

    return result;
  }
}

export default Family;
