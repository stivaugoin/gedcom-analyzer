import { Person } from '../classes';

const getPerson = (pointer) => {
  const { localStorage } = window;

  const { people } = JSON.parse(localStorage.getItem('people'));
  const person = people.find(p => p.pointer === pointer);

  return new Person(person);
};

export {
  getPerson,
};
