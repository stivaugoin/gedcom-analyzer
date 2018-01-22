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

  /**
   * Get the prefered complete name
   *
   * @readonly
   * @memberof Person
   */
  get name() {
    return this.person.names[0].complete;
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
}

export default Person;
