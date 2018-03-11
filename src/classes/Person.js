// @flow
import moment from "moment";

import type { Person as PersonType } from "../api/person/types";

class Person {
  person: PersonType;

  constructor(person: PersonType) {
    this.person = person;
  }

  get name(): string {
    return `${this.person.names[0].fname} ${this.person.names[0].lname}`;
  }

  get birthYear(): string {
    if (!this.person.birthDate) {
      return "????";
    }

    return moment(this.person.birthDate).format("YYYY");
  }

  get deathYear(): string {
    if (!this.person.deathDate) {
      return "????";
    }

    return moment(this.person.deathDate).format("YYYY");
  }

  get format(): string {
    return `${this.name} (${this.birthYear} - ${this.deathYear})`;
  }

  get events(): Array<{ name: string, place?: string, date?: string }> {
    const events = [];

    if (this.person.birth && Object.keys(this.person.birth).length > 0) {
      events.push({ name: "birth", ...this.person.birth });
    }

    if (this.person.death && Object.keys(this.person.death).length > 0) {
      events.push({ name: "death", ...this.person.death });
    }

    if (this.person.weddings && this.person.weddings.length > 0) {
      this.person.weddings.forEach(event => {
        events.push({ name: "wedding", ...event });
      });
    }

    return events.sort(
      (a, b) => new Date(a.date || "") - new Date(b.date || "")
    );
  }
}

export default Person;
