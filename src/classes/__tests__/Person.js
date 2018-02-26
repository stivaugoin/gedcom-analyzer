/* eslint-disable no-undef */

import moment from "moment";

import Person from "../Person";

const person = {
  pointer: "@P1@",
  names: [
    {
      complete: "Anakin Skywalker",
      first: "Anakin",
      last: "Skywalker",
    },
    {
      complete: "Darth Vader",
      firt: "Darth",
      last: "Vader",
    },
  ],
  birth: {
    date: "2000-01-01",
    place: "Canada",
  },
  death: {
    date: "2000-01-01",
    place: "Canada",
  },
  sex: "M",
};

describe("Person class", () => {
  describe("Methods - pointer()", () => {
    it("should returns a string", () => {
      const currPerson = new Person(person);
      expect(typeof currPerson.pointer).toEqual("string");
    });

    it("should returns the pointer", () => {
      const currPerson = new Person(person);
      expect(currPerson.pointer).toEqual(person.pointer);
    });
  });

  describe("Methods - name()", () => {
    it("should returns a string", () => {
      const currPerson = new Person(person);
      expect(typeof currPerson.name).toEqual("string");
    });

    it("should returns the right name", () => {
      const currPerson = new Person(person);
      expect(currPerson.name).toEqual(person.names[0].complete);
    });
  });

  describe("Methods - sex()", () => {
    it("should returns a string", () => {
      const currPerson = new Person(person);
      expect(typeof currPerson.sex).toEqual("string");
    });

    it("should returns only one character", () => {
      const currPerson = new Person(person);
      expect(currPerson.sex.length).toEqual(1);
    });

    it("should returns the right sex", () => {
      const currPerson = new Person(person);
      expect(currPerson.sex).toEqual(person.sex);
    });
  });

  describe("Methods - birthDate()", () => {
    it("should returns a string", () => {
      const currPerson = new Person(person);
      expect(typeof currPerson.birthDate).toEqual("string");
    });

    it("should returns the date of birth", () => {
      const currPerson = new Person(person);
      expect(currPerson.birthDate).toEqual(person.birth.date);
    });

    it("should return undefined when there are no birth", () => {
      const currPerson = new Person({});
      expect(currPerson.birthDate).toBeUndefined();
    });
  });

  describe("Methods - birthYear()", () => {
    it("should returns a string", () => {
      const currPerson = new Person(person);
      expect(typeof currPerson.birthYear).toEqual("string");
    });

    it("should returns the year of birth", () => {
      const currPerson = new Person(person);
      expect(currPerson.birthYear).toEqual(
        moment(person.birth.date).format("YYYY")
      );
    });

    it("should return undefined when there are no birth", () => {
      const currPerson = new Person({});
      expect(currPerson.birthDate).toBeUndefined();
    });
  });

  describe("Methods - birthPlace()", () => {
    it("should returns a string", () => {
      const currPerson = new Person(person);
      expect(typeof currPerson.birthDate).toEqual("string");
    });

    it("should returns the place of birth", () => {
      const currPerson = new Person(person);
      expect(currPerson.birthPlace).toEqual(person.birth.place);
    });

    it("should return undefined when there are no birth", () => {
      const currPerson = new Person({});
      expect(currPerson.birthDate).toBeUndefined();
    });
  });
});
