import { findTags } from "./helpers";

class TreeParser {
  constructor(raw) {
    this.raw = raw;
  }

  getPersons() {
    return this.raw.filter(r => r.tag === "INDI");
  }

  getChildren(pointer: string) {
    const individual = this.getIndividual(pointer);
    if (!individual) {
      return [];
    }

    const tags = findTags(individual.tree, "FAMS");
    if (!tags || tags.length === 0) {
      return [];
    }

    const children = [];
    tags.forEach(tag => {
      const familyPointer = tag.data;
      const family = this.getFamily(familyPointer);
      const childs = findTags(family.tree, "CHIL");

      if (childs && childs.length > 0) {
        childs.forEach(child => {
          children.push({
            pointer: child.data,
            ...this.getName(child.data)[0],
          });
        });
      }
    });
    return children;
  }

  getPlaces({ unique = false } = {}) {
    const places = [];
    const tree = this;

    function getTree(data) {
      data.forEach(d => {
        const place = tree.findTags(data, "PLAC");
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
