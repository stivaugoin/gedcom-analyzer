import Date from '../Dates';

class TreeParser {
  constructor(raw) {
    this.raw = raw;
  }

  getPersons() {
    return this.raw.filter(r => r.tag === 'INDI');
  }

  getFamilies() {
    return this.raw.filter(r => r.tag === 'FAM');
  }

  findTags(data, tag) {
    const d = data.filter(el => el.tag === tag);

    if (d.length > 0) {
      return d.map((el) => {
        const result = {};
        if (el.data) result.data = el.data;
        if (el.tree && el.tree.length > 0) result.tree = el.tree;
        return result;
      });
    }
    return [];
  }

  getPlaceDate(tree) {
    const place = this.findTags(tree, 'PLAC');
    const date = this.findTags(tree, 'DATE');

    if (!place.length && !date.length) {
      return {};
    }

    const result = {};
    if (place.length) {
      result.place = place[0] && place[0].data;
    }
    if (date.length) {
      // Format date
      const d = date[0] && date[0].data;
      // result.date = d;
      result.date = new Date(d).format();
    }
    return result;
  }

  getChildren(pointer) {
    const individual = this.getIndividual(pointer);
    if (!individual) {
      return [];
    }

    const tags = this.findTags(individual.tree, 'FAMS');
    if (!tags || tags.length === 0) {
      return [];
    }

    const children = [];
    tags.forEach((tag) => {
      const familyPointer = tag.data;
      const family = this.getFamily(familyPointer);
      const childs = this.findTags(family.tree, 'CHIL');

      if (childs && childs.length > 0) {
        childs.forEach((child) => {
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
      data.forEach((d) => {
        const place = tree.findTags(data, 'PLAC');
        if (place && place.length > 0) {
          places.push(place[0].data);
        } else if (d.tree && d.tree.length > 0) {
          getTree(d.tree);
        }
      });
    }

    this.raw.forEach((r) => {
      getTree(r.tree);
    });

    if (unique) {
      const placesMap = new Map();
      const uniquePlace = [];
      places.forEach((place) => {
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
