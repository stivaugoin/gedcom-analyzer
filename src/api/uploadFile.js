// @flow
import gedcom from "parse-gedcom";
import geocoder from "geocoder-geojson";

import db from "./db";

import { addDetails, Family, Person, Source, Tree } from "../parser";

const uploadFile = (input: any, callback: Function) => {
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
       * SOURCES
       ********************************************************************** */
      const sources = tree.sources.map(s => {
        const { pointer, name } = new Source(s);

        return {
          pointer,
          name,
        };
      });

      console.log("Sources", sources);

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
          birth: addDetails(person.birth, { places, sources }),
          birthDate: person.birth && person.birth.date,
          baptism: addDetails(person.baptism, { places, sources }),
          residences: person.residences.map(residence =>
            addDetails(residence, { places, sources })
          ),
          death: addDetails(person.death, { places, sources }),
          deathDate: person.death && person.death.date,
          buried: addDetails(person.buried, { places, sources }),
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
          info.weddings.push(addDetails(rest, { places, sources }));

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

      /** **********************************************************************
       * STATISTIC
       ********************************************************************** */
      const statistics = {
        events: {},
        people: {},
        places: {},
        sources: {},
      };

      const events = [
        "baptism",
        "birth",
        "buried",
        "death",
        "residences",
        "weddings",
      ];
      // Build basic structure
      Object.keys(statistics).forEach(statistic => {
        if (statistic === "events") {
          events.forEach(event => {
            statistics.events[event] = {};
          });
        }

        if (statistic === "people") {
          ["total", "men", "women", "withParents"].forEach(detail => {
            statistics.people[detail] = 0;
          });
        }

        if (statistic === "places") {
          ["total"].forEach(detail => {
            statistics.places[detail] = 0;
          });

          ["country"].forEach(detail => {
            statistics.places[detail] = [];
          });
        }
      });

      people.forEach(person => {
        statistics.people.total += 1;

        Object.keys(person).forEach(key => {
          if (
            key === "baptism" ||
            key === "birth" ||
            key === "buried" ||
            key === "death"
          ) {
            if (person[key] && Object.keys(person[key]).length > 0) {
              if (!statistics.events[key].total) {
                statistics.events[key].total = 0;
              }
              statistics.events[key].total += 1;

              Object.keys(person[key]).forEach(k => {
                if (!statistics.events[key][k]) {
                  statistics.events[key][k] = 0;
                }
                statistics.events[key][k] += 1;
              });
            }
          }

          if (key === "residences" || key === "weddings") {
            if (Array.isArray(person[key]) && person[key].length > 0) {
              if (!statistics.events[key].atLeastOne) {
                statistics.events[key].atLeastOne = 0;
              }
              statistics.events[key].atLeastOne += 1;
            }

            person[key].forEach(event => {
              if (!statistics.events[key].total) {
                statistics.events[key].total = 0;
              }
              statistics.events[key].total += 1;

              Object.keys(event).forEach(k => {
                if (!statistics.events[key][k]) {
                  statistics.events[key][k] = 0;
                }
                statistics.events[key][k] += 1;
              });
            });
          }
        });

        // People
        if (person.sex === "M") {
          statistics.people.men += 1;
        }

        if (person.sex === "F") {
          statistics.people.women += 1;
        }

        if (person.parents && person.parents.length > 0) {
          statistics.people.withParents += 1;
        }
      });

      console.log(statistics);

      Promise.all([
        db.meta.add({ name: "filename", value: filename }),
        db.people.bulkAdd(people),
        db.places.bulkAdd(places),
        db.sources.bulkAdd(sources),
        db.statistics.add(statistics),
      ]).then(() => {
        callback();
      });
    };
    fileReader.readAsText(file);
  }
};

export default uploadFile;
