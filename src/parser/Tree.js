// @flow
import { findTags } from "./helpers";

const INDIVIDUAL = "INDI";
const FAMILY = "FAM";
const SOURCE = "SOUR";

class Tree {
  tree: any;

  constructor(tree: any) {
    this.tree = tree;
  }

  get people(): Array<{}> {
    return this.tree.filter(r => r.tag === INDIVIDUAL);
  }

  get families(): Array<{}> {
    return this.tree.filter(r => r.tag === FAMILY);
  }

  get sources(): Array<{}> {
    return this.tree.filter(r => r.tag === SOURCE);
  }

  get places(): any {
    const placesMap = new Map();

    function getTree(data) {
      data.forEach(d => {
        const place = findTags(data, "PLAC");
        if (place && place.length > 0) {
          const name = place[0].data;
          if (placesMap.get(name)) {
            placesMap.set(name, placesMap.get(name) + 1);
          } else {
            placesMap.set(name, 1);
          }
        } else if (d.tree && d.tree.length > 0) {
          getTree(d.tree);
        }
      });
    }

    this.tree.forEach(r => {
      getTree(r.tree);
    });

    const uniquePlace = [];
    placesMap.forEach((value, key) => {
      uniquePlace.push({ name: key, count: value });
    });

    return uniquePlace;
  }

  find(pointer: string): {} {
    return this.tree.find(t => t.pointer.slice(1, -1) === pointer);
  }
}

export default Tree;
