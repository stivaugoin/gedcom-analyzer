import gedcom from 'parse-gedcom';

import TreeParser from '../classes/parser/TreeParser';
import PersonParser from '../classes/parser/PersonParser';
import { People, Person } from '../classes';

export const uploadFile = (event, callback) => {
  if (typeof window.FileReader !== 'function') {
    throw new Error('The file API isn\'t supported on this browser.');
  }

  const input = event.target;
  if (!input) {
    throw new Error('The browser does not properly implement the event object');
  }

  if (!input.files) {
    throw new Error('This browser does not support the `files` property of the file input.');
  }

  if (input.files[0]) {
    const file = input.files[0];
    const filename = file.name;
    const fileReader = new FileReader();

    fileReader.onload = (fileContent) => {
      const { result } = fileContent.currentTarget;
      const dataParsed = gedcom.parse(result);

      window.localStorage.setItem('filename', filename);

      const myTree = new TreeParser(dataParsed);

      const people = myTree.getPersons().map(
        person => new PersonParser(dataParsed, person).format(),
      );

      window.localStorage.setItem('people', JSON.stringify(people));

      callback();
    };
    fileReader.readAsText(file);
  }
};

export const getFilename = () => window.localStorage.getItem('filename');

export const getPeople = () => {
  const peopleRaw = window.localStorage.getItem('people');
  return new People(JSON.parse(peopleRaw));
};

export const getPerson = (pointer) => {
  const peopleRaw = window.localStorage.getItem('people');
  return new Person(JSON.parse(peopleRaw).find(p => p.pointer === pointer));
};

export const clearLocalstorage = () => window.localStorage.clear();
