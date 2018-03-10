// @flow
import moment from "moment";

import TreeParser from "./TreeParser";
import FamilyParser from "./FamilyParser";
import { findTags, getPlaceDate } from "./helpers";
import type {
  Weddings as WeddingsType,
  Person as PersonType,
} from "../../api/person/types";

class PersonParser extends TreeParser {
  raw: any;
  person: any;

  constructor(raw: any, person: any) {
    super();

    this.raw = raw;
    this.person = person;

    if (!this.isPerson()) {
      throw new Error(`${this.person.pointer} is not a Person`);
    }
  }

  isPerson(): boolean {
    return this.person.tag === "INDI";
  }

  format(): PersonType {
    return {
      pointer: this.pointer,
      sex: this.sex,
      names: this.names,
      name: this.name,
      fname: this.fname,
      lname: this.lname,
      birth: this.birth,
      death: this.death,
      age: this.age,
      residences: this.residences,
      weddings: this.weddings,
      children: this.children,
      parents: this.parents,
    };
  }

  findFamily(pointer: string): {} {
    return this.raw.find(r => r.tag === "FAM" && r.pointer === pointer);
  }

  get pointer(): string {
    return this.person.pointer.slice(1, -1);
  }

  get sex(): string {
    const tags = findTags(this.person.tree, "SEX");
    if (!tags || tags.length === 0 || !tags[0] || !tags[0].data) {
      return "";
    }

    return tags[0].data;
  }

  get names(): Array<{ fname: string, lname: string }> {
    const tags = findTags(this.person.tree, "NAME");
    if (!tags || tags.length === 0) {
      return [];
    }

    return tags.map(tag => ({
      fname: tag.data.split("/").map(n => n.trim())[0],
      lname: tag.data.split("/").map(n => n.trim())[1],
    }));
  }

  get name(): string {
    return `${this.fname} ${this.lname}`;
  }

  get fname(): string {
    return this.names[0].fname;
  }

  get lname(): string {
    return this.names[0].lname;
  }

  get birth(): { date?: ?string, place?: ?string } | {} {
    const tags = findTags(this.person.tree, "BIRT");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getPlaceDate(tags[0].tree);
  }

  get death(): { date?: ?string, place?: ?string } | {} {
    const tags = findTags(this.person.tree, "DEAT");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getPlaceDate(tags[0].tree);
  }

  get age(): number | null {
    if (!this.birth || !this.birth.date) {
      return null;
    }

    const birthDate = moment(this.birth.date);

    if (!this.death || !this.death.date) {
      return null;
    }

    const deathDate = moment(this.death.date);
    if (birthDate.isSameOrAfter(deathDate)) {
      return null;
    }

    return deathDate.diff(birthDate, "year");
  }

  get residences(): Array<{}> {
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

  get weddings(): WeddingsType {
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

      if (wedding.husband !== this.pointer) {
        wedding.spouse = wedding.husband;
      }

      if (wedding.wife !== this.pointer) {
        wedding.spouse = wedding.wife;
      }

      delete wedding.husband;
      delete wedding.wife;

      return wedding;
    });
  }

  get children(): Array<string> {
    const tags = findTags(this.person.tree, "FAMS");
    if (!tags || tags.length === 0) {
      return [];
    }

    const allChild = [];
    tags.forEach(tag =>
      new FamilyParser(this.raw, this.findFamily(tag.data)).children.forEach(
        child => allChild.push(child)
      )
    );

    return allChild;
  }

  get parents(): Array<{ relation: "father" | "mother", pointer: string }> {
    const tags = findTags(this.person.tree, "FAMC");
    if (!tags || tags.length === 0) {
      return [];
    }

    return new FamilyParser(this.raw, this.findFamily(tags[0].data)).parents;
  }
}

export default PersonParser;
