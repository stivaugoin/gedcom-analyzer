// @flow
import gedcom from "parse-gedcom";
import geocoder from "geocoder-geojson";

import db from "./db";

import Person from "./classes/Person";
import Tree from "./classes/Tree";
import Family from "./classes/Family";
import { addCoord } from "../classes/parser/helpers";

const uploadFile = (input, callback: Function) => {
  if (typeof window.FileReader !== "function") {
    throw new Error("The file API isn't supported on this browser.");
  }

  if (!input) {
    throw new Error("The browser does not properly implement the event object");
  }

  if (!input.files) {
    throw new Error(
      "This browser does not support the `files` property of the file input."
    );
  }

  if (input.files[0]) {
    const file = input.files[0];
    const filename = file.name;
    const fileReader = new FileReader();

    fileReader.onload = async fileContent => {
      const { result } = fileContent.currentTarget;
      const dataParsed = gedcom.parse(result);

      const tree = new Tree(dataParsed);

      /** **********************************************************************
       * PLACES
       ********************************************************************** */
      const places = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const place of tree.places) {
        const { name, count } = place;

        // eslint-disable-next-line no-await-in-loop
        const geojson = await geocoder.google(name);

        if (geojson.features.length) {
          const { coordinates } = geojson.features[0].geometry;
          const [lng, lat] = coordinates;

          places.push({
            name,
            count,
            lng,
            lat,
          });
        } else {
          places.push({
            name,
            count,
          });
        }
      }

      console.log("Places", places);

      /** **********************************************************************
       * PEOPLE
       ********************************************************************** */
      const people = tree.people.map(p => {
        const person = new Person(p);

        const info = {
          pointer: person.pointer,
          sex: person.sex,
          names: person.names,
          name: `${person.names[0].fname} ${person.names[0].lname}`,
          fname: person.names[0].fname,
          lname: person.names[0].lname,
          age: person.age,
          birth: addCoord(person.birth, places),
          birthDate: person.birth && person.birth.date,
          baptem: addCoord(person.baptem, places),
          residences: person.residences.map(residence =>
            addCoord(residence, places)
          ),
          death: addCoord(person.death, places),
          deathDate: person.death && person.death.date,
          buried: addCoord(person.buried, places),
          children: [],
          weddings: [],
          parents: [],
        };

        // Family as Spouse
        person.fams.forEach(family => {
          const fams = new Family(tree.find(family));
          const { wedding } = fams;
          wedding.spouse =
            wedding.husband === person.pointer ? wedding.wife : wedding.husband;
          const { husband, wife, ...rest } = wedding;
          info.weddings.push(addCoord(rest, places));

          info.children = [...info.children, ...fams.children];
        });

        // Family as Child
        if (person.famc) {
          // Parents
          const famc = new Family(tree.find(person.famc));
          info.parents = famc.parents;
        }

        return info;
      });

      console.log("People", people);

      Promise.all([
        db.meta.add({ name: "filename", value: filename }),
        db.people.bulkAdd(people),
        db.places.bulkAdd(places),
      ]).then(() => {
        callback();
      });
    };
    fileReader.readAsText(file);
  }
};

export default uploadFile;
