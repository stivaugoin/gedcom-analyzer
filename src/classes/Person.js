import moment from 'moment';

/**
 *
 *
 * @class Person
 */
class Person {
  constructor(person) {
    this.person = person;
  }

  get pointer() {
    return this.person.pointer;
  }

  /**
   * Get the prefered complete name
   *
   * @readonly
   * @memberof Person
   */
  get name() {
    return this.person.names[0].complete;
  }

  get sex() {
    return this.person.sex;
  }

  /**
   * Get the birthdate.
   * Returns undefined if not exists
   *
   * @readonly
   * @memberof Person
   */
  get birthDate() {
    return this.person.birth && this.person.birth.date;
  }

  /**
   * Get the year of birth
   * Returns undefined if birthdate not exists
   *
   * @readonly
   * @memberof Person
   */
  get birthYear() {
    return this.birthDate && moment(this.birthDate).format('YYYY');
  }

  get birthPlace() {
    return this.person.birth && this.person.birth.place;
  }

  get weddingDate() {
    return this.person.weddings && this.person.weddings[0] && this.person.weddings[0].date;
  }

  get weddingPlace() {
    return this.person.weddings && this.person.weddings[0] && this.person.weddings[0].place;
  }

  get deathDate() {
    return this.person.death && this.person.death.date;
  }

  get deathYear() {
    return this.deathDate && moment(this.deathDate).format('YYYY');
  }

  get deathPlace() {
    return this.person.death && this.person.death.place;
  }

  get format() {
    return `${this.name} (${this.birthYear || ''}${this.deathYear ? '-' : ''}${this.deathYear || ''})`;
  }

  get mother() {
    return this.person.parents && this.person.parents.length > 0 &&
      this.person.parents.find(parent => parent.relation === 'mother');
  }

  get father() {
    return this.person.parents && this.person.parents.length > 0 &&
      this.person.parents.find(parent => parent.relation === 'father');
  }

  age(precision = 'year') {
    if (!this.birthDate || !this.deathDate) {
      return null;
    }

    if (moment(this.birthDate).isSameOrAfter(moment(this.deathDate))) {
      return null;
    }

    if (precision === 'year') {
      return moment(this.deathDate).diff(this.birthDate, 'year');
    }

    return null;
  }

  isError() {
    if (!this.birthDate || !this.deathDate) {
      return false;
    }

    if (moment(this.birthDate).isSameOrAfter(moment(this.deathDate))) {
      return true;
    }

    return false;
  }

  events() {
    const events = [];
    Object.keys(this.person)
      .filter(key => ['birth', 'death', 'weddings'].includes(key))
      .forEach((key) => {
        if (key === 'weddings') {
          this.person.weddings.forEach((event) => {
            events.push({ name: 'wedding', ...event });
          });
        } else {
          events.push({ name: key, ...this.person[key] });
        }
      });

    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}

export default Person;
