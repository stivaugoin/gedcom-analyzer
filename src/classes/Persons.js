import Person from './Person';

class Persons {
  constructor(persons) {
    this.persons = persons;
  }

  getOldestAncestor() {
    const persons = this.persons
      .filter(person => person.birth && person.birth.date)
      .map(person => ({
        ...person,
        age: new Person(person).age('year'),
      }))
      .sort((a, b) => new Date(a.birth.date) - new Date(b.birth.date));

    return persons[0];
  }

  getLongestLife() {
    const persons = this.persons.map(person => ({
      ...person,
      age: new Person(person).age('year'),
    })).sort((a, b) => b.age - a.age);

    return persons[0];
  }

  getShortestLife() {
    const persons = this.persons.map(person => ({
      ...person,
      age: new Person(person).age('year'),
    })).filter(p => p.age).sort((a, b) => a.age - b.age);

    return persons[0];
  }

  getAverageAge() {
    const ages = this.persons.map((p) => {
      const person = new Person(p);
      return person.age('year');
    });
    const total = ages.reduce((a, b) => a + b, 0);

    return Math.round(total / ages.length);
  }

  getMedianAge() {
    const ages = this.persons.map((p) => {
      const person = new Person(p);
      return person.age('year');
    }).sort((a, b) => a - b);

    const half = Math.floor(ages.length / 2);

    if (half % 2) {
      return ages[half];
    }

    return (ages[half - 1] + ages[half]) / 2.0;
  }

  getErrors() {
    return this.persons.filter(person => new Person(person).isError());
  }
}

export default Persons;
