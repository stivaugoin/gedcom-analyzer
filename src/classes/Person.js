import moment from "moment";

import { getPerson } from "../helpers/localstorage";

/**
 *
 *
 * @class Person
 */
class Person {
  constructor(person) {
    this.person = person;
  }

  /**
   * Get the pointer of the person
   *
   * @readonly
   * @memberof Person
   */
  get pointer() {
    return this.person.pointer;
  }

  /**
   * Get the prefered complete name of the person
   *
   * @readonly
   * @memberof Person
   */
  get name() {
    return this.person.names[0].complete;
  }

  /**
   * Get the sex of the person
   *
   * @readonly
   * @memberof Person
   */
  get sex() {
    return this.person.sex;
  }

  /**
   * Get the birthdate.
   * Returns undefined if birth not exists
   *
   * @readonly
   * @memberof Person
   */
  get birthDate() {
    return this.person.birth && this.person.birth.date;
  }

  /**
   * Get the year of birth
   * Returns undefined if birth not exists
   *
   * @readonly
   * @memberof Person
   */
  get birthYear() {
    return this.birthDate && moment(this.birthDate).format("YYYY");
  }

  /**
   * Get the place of birth
   * Returns undefined if birth not exists
   *
   * @readonly
   * @memberof Person
   */
  get birthPlace() {
    return this.person.birth && this.person.birth.place;
  }

  /**
   * Get the date of wedding
   *
   * @readonly
   * @memberof Person
   */
  get weddingDate() {
    return (
      this.person.weddings &&
      this.person.weddings[0] &&
      this.person.weddings[0].date
    );
  }

  /**
   * Get the place of wedding
   *
   * @readonly
   * @memberof Person
   */
  get weddingPlace() {
    return (
      this.person.weddings &&
      this.person.weddings[0] &&
      this.person.weddings[0].place
    );
  }

  /**
   * Get the date of death
   *
   * @readonly
   * @memberof Person
   */
  get deathDate() {
    return this.person.death && this.person.death.date;
  }

  /**
   * Get the year of death
   *
   * @readonly
   * @memberof Person
   */
  get deathYear() {
    return this.deathDate && moment(this.deathDate).format("YYYY");
  }

  /**
   * Get the place of death
   *
   * @readonly
   * @memberof Person
   */
  get deathPlace() {
    return this.person.death && this.person.death.place;
  }

  get format() {
    return `${this.name} (${this.birthYear || ""}${
      this.deathYear ? "-" : ""
    }${this.deathYear || ""})`;
  }

  get mother() {
    const mother =
      this.person.parents &&
      this.person.parents.length > 0 &&
      this.person.parents.find(parent => parent.relation === "mother");

    if (mother) {
      return getPerson(mother.pointer);
    }

    return {};
  }

  get father() {
    const father =
      this.person.parents &&
      this.person.parents.length > 0 &&
      this.person.parents.find(parent => parent.relation === "father");

    if (father) {
      return getPerson(father.pointer);
    }

    return {};
  }

  age(precision = "year") {
    if (!this.birthDate || !this.deathDate) {
      return null;
    }

    if (moment(this.birthDate).isSameOrAfter(moment(this.deathDate))) {
      return null;
    }

    if (precision === "year") {
      return moment(this.deathDate).diff(this.birthDate, "year");
    }

    return null;
  }

  events() {
    const events = [];
    Object.keys(this.person)
      .filter(key => ["birth", "death", "weddings"].includes(key))
      .forEach(key => {
        if (key === "weddings") {
          this.person.weddings.forEach(event => {
            events.push({ name: "wedding", ...event });
          });
        } else {
          events.push({ name: key, ...this.person[key] });
        }
      });

    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}

export default Person;
