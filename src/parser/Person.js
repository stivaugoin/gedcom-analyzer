// @flow
import moment from "moment";

import { findTags, getEventDetails } from "./helpers";

import type { Place } from "../api/place/types";
import type { Residence } from "../api/person/types";

class Person {
  person: any;

  constructor(person: any) {
    this.person = person;
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

  get birth(): { date?: string, place?: Place } {
    const tags = findTags(this.person.tree, "BIRT");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getEventDetails(tags[0].tree);
  }

  get baptism(): { date?: string, place?: Place } {
    const tags = findTags(this.person.tree, "BAPM");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getEventDetails(tags[0].tree);
  }

  get buried(): { date?: string, place?: Place } {
    const tags = findTags(this.person.tree, "BURI");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getEventDetails(tags[0].tree);
  }

  get death(): { date?: string, place?: Place } {
    const tags = findTags(this.person.tree, "DEAT");
    if (!tags || tags.length === 0 || !tags[0].tree) {
      return {};
    }

    return getEventDetails(tags[0].tree);
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

  get residences(): Array<Residence> {
    const tags = findTags(this.person.tree, "RESI");
    if (!tags || tags.length === 0) {
      return [];
    }

    return tags.map(tag => {
      if (tag.tree) {
        return getEventDetails(tag.tree);
      }
      return tag.data;
    });
  }

  get fams(): Array<string> {
    const tags = findTags(this.person.tree, "FAMS");
    if (!tags || tags.length === 0 || !tags[0] || !tags[0].data) {
      return [];
    }

    return tags.map(tag => tag.data.slice(1, -1));
  }

  get famc(): string | null {
    const tags = findTags(this.person.tree, "FAMC");
    if (!tags || tags.length === 0 || !tags[0] || !tags[0].data) {
      return null;
    }

    return tags[0].data.slice(1, -1);
  }
}

export default Person;
