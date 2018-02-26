import TreeParser from "./TreeParser";
import FamilyParser from "./FamilyParser";
import { findTags, getPlaceDate } from "./helpers";

class PersonParser extends TreeParser {
  constructor(raw, person) {
    super();

    this.raw = raw;
    this.person = person;

    if (!this.isPerson()) {
      throw new Error(`${this.person.pointer} is not a Person`);
    }
  }

  isPerson() {
    return this.person.tag === "INDI";
  }

  format() {
    const {
      birth,
      children,
      death,
      names,
      parents,
      person,
      residences,
      sex,
      weddings,
    } = this;
    const { pointer } = person;

    return {
      birth: birth || {},
      death: death || {},
      residences: residences || [],
      weddings: weddings || [],
      children: children || [],
      parents: parents || [],
      pointer,
      names,
      sex,
    };
  }

  findFamily(pointer) {
    return this.raw.find(r => r.tag === "FAM" && r.pointer === pointer);
  }

  get names() {
    const tags = findTags(this.person.tree, "NAME");
    if (!tags || tags.length === 0) {
      return [];
    }

    return tags.map(tag => {
      // TODO: Handle all possibility of the structure of name
      const nameSplitted = tag.data.split("/").map(n => n.trim());

      return {
        complete: `${nameSplitted[0]} ${nameSplitted[1] || ""}`.trim(),
        first: nameSplitted[0],
        last: nameSplitted[1],
      };
    });
  }

  get namePrefered() {
    return this.names[0];
  }

  get sex() {
    const tags = findTags(this.person.tree, "SEX");
    if (!tags || tags.length === 0 || !tags[0] || !tags[0].data) {
      return "";
    }

    return tags[0].data;
  }

  get birth() {
    const tags = findTags(this.person.tree, "BIRT");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getPlaceDate(tags[0].tree);
  }

  get death() {
    const tags = findTags(this.person.tree, "DEAT");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getPlaceDate(tags[0].tree);
  }

  get residences() {
    const tags = findTags(this.person.tree, "RESI");
    if (!tags || tags.length === 0) {
      return [];
    }

    return tags.map(tag => {
      if (tag.tree) {
        return getPlaceDate(tag.tree);
      }
      return tag.data;
    });
  }

  get weddings() {
    const tags = findTags(this.person.tree, "FAMS");
    if (!tags || tags.length === 0) {
      return [];
    }

    return tags.map(tag => {
      const familyPointer = tag.data;
      const { wedding } = new FamilyParser(
        this.raw,
        this.findFamily(familyPointer)
      );

      if (wedding.husband && wedding.husband.pointer !== this.pointer) {
        wedding.spouse = wedding.husband;
      }
      if (wedding.wife && wedding.wife.pointer !== this.pointer) {
        wedding.spouse = wedding.wife;
      }

      delete wedding.husband;
      delete wedding.wife;

      return wedding;
    });
  }

  get children() {
    const tags = findTags(this.person.tree, "FAMS");
    if (!tags || tags.length === 0) {
      return [];
    }

    const allChild = [];
    tags.forEach(tag => {
      const familyPointer = tag.data;
      const { children } = new FamilyParser(
        this.raw,
        this.findFamily(familyPointer)
      );
      children.forEach(child => allChild.push(child));
    });
    return allChild;
  }

  get parents() {
    const tags = findTags(this.person.tree, "FAMC");
    if (!tags || tags.length === 0) {
      return [];
    }

    return new FamilyParser(this.raw, this.findFamily(tags[0].data)).parents;
  }
}

export default PersonParser;
