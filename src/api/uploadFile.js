import gedcom from "parse-gedcom";
import geocoder from "geocoder-geojson";

import db from "./db";
import TreeParser from "../classes/parser/TreeParser";
import PersonParser from "../classes/parser/PersonParser";

const uploadFile = (input, callback) => {
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

      const tree = new TreeParser(dataParsed);

      // People
      const people = tree.getPeople().map(person => {
        const info = new PersonParser(dataParsed, person).format();

        return {
          ...info,
          birthDate: info.birth && info.birth.date,
          deathDate: info.death && info.death.date,
        };
      });

      // Places
      const placesMap = new Map();
      tree.getPlaces().forEach(place => {
        const existingPlace = placesMap.get(place);

        if (existingPlace) {
          placesMap.set(place, existingPlace + 1);
        } else {
          placesMap.set(place, 1);
        }
      });

      const places = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const value of placesMap) {
        const [place, count] = value;

        // eslint-disable-next-line no-await-in-loop
        const geojson = await geocoder.google(place);

        if (geojson.features.length) {
          const { coordinates } = geojson.features[0].geometry;
          const [lng, lat] = coordinates;

          places.push({
            name: place,
            count,
            lng,
            lat,
          });
        } else {
          places.push({
            name: place,
            count,
          });
        }
      }

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
