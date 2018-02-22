import Person from "./Person";

class People {
  constructor(people) {
    this.people = people;
  }

  get size() {
    return this.people.length;
  }

  getOldestAncestor() {
    const people = this.people
      .filter(person => person.birth && person.birth.date)
      .map(person => ({
        ...person,
        age: new Person(person).age("year"),
      }))
      .sort((a, b) => new Date(a.birth.date) - new Date(b.birth.date));

    return people[0];
  }

  getLongestLife() {
    const people = this.people
      .map(person => ({
        ...person,
        age: new Person(person).age("year"),
      }))
      .sort((a, b) => b.age - a.age);

    return people[0];
  }

  getShortestLife() {
    const people = this.people
      .map(person => ({
        ...person,
        age: new Person(person).age("year"),
      }))
      .filter(p => p.age)
      .sort((a, b) => a.age - b.age);

    return people[0];
  }

  getAverageAge() {
    const ages = this.people.map(p => {
      const person = new Person(p);
      return person.age("year");
    });
    const total = ages.reduce((a, b) => a + b, 0);

    return Math.round(total / ages.length);
  }

  getMedianAge() {
    const ages = this.people
      .map(p => {
        const person = new Person(p);
        return person.age("year");
      })
      .sort((a, b) => a - b);

    const half = Math.floor(ages.length / 2);

    if (half % 2) {
      return ages[half];
    }

    return (ages[half - 1] + ages[half]) / 2.0;
  }

  getErrors() {
    return this.people.filter(person => new Person(person).isError());
  }

  getPlacesCount() {
    const placesMap = new Map();

    this.people.forEach(person => {
      Object.keys(person).forEach(event => {
        Object.keys(person[event]).forEach(key => {
          if (key === "place") {
            const place = person[event][key];
            const existingPlace = placesMap.get(place);
            if (existingPlace >= 0) {
              placesMap.set(place, existingPlace + 1);
            } else {
              placesMap.set(place, 0);
            }
          }
        });
      });
    });

    const places = [];
    placesMap.forEach((value, key) => places.push({ name: key, count: value }));

    const placesSorted = places.sort((a, b) => b.count - a.count);

    return placesSorted;
  }

  getMostPopularPlace() {
    return this.getPlacesCount()[0];
  }
}

export default People;
