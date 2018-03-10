// @flow
import { findTags } from "./helpers";

class TreeParser {
  raw: any;

  constructor(raw: any) {
    this.raw = raw;
  }

  getPeople(): Array<any> {
    return this.raw.filter(r => r.tag === "INDI");
  }

  getPlaces({ unique }: { unique: boolean } = { unique: false }) {
    const places = [];

    function getTree(data) {
      data.forEach(d => {
        const place = findTags(data, "PLAC");
        if (place && place.length > 0) {
          places.push(place[0].data);
        } else if (d.tree && d.tree.length > 0) {
          getTree(d.tree);
        }
      });
    }

    this.raw.forEach(r => {
      getTree(r.tree);
    });

    if (unique) {
      const placesMap = new Map();
      const uniquePlace = [];
      places.forEach(place => {
        if (placesMap.get(place)) {
          placesMap.set(place, placesMap.get(place) + 1);
        } else {
          placesMap.set(place, 1);
        }
      });

      placesMap.forEach((value, key) => {
        uniquePlace.push({ name: key, count: value });
      });

      return uniquePlace;
    }

    return places;
  }
}

export default TreeParser;
