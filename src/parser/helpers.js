// @flow
import Dates from "../classes/Dates";

import type { Place } from "../api/place/types";
import type { Source } from "../api/source/types";

type dataType = Array<{ tag: string, tree: Array<any> }>;

const findTags = (data: dataType, tag: string): Array<any> => {
  const d = data.filter(el => el.tag === tag);

  if (d.length > 0) {
    return d.map(el => {
      const result = {};
      if (el.data) result.data = el.data;
      if (el.tree && el.tree.length > 0) result.tree = el.tree;
      return result;
    });
  }
  return [];
};

const getEventDetails = (
  tree: dataType
): {
  date?: string,
  place?: Place,
  source?: Source,
} => {
  const place = findTags(tree, "PLAC");
  const date = findTags(tree, "DATE");
  const source = findTags(tree, "SOUR");

  const result = {};

  if (place.length && place[0] && place[0].data) {
    result.place = {};
    result.place.name = place[0] && place[0].data;
  }
  if (date.length && date[0] && date[0].data) {
    result.date = new Dates(date[0].data).format();
  }
  if (source.length && source[0] && source[0].data) {
    result.source = {};
    result.source.pointer = source[0] && source[0].data.slice(1, -1);
  }

  return result;
};

// $FlowFixMe
const addDetails = (event, { places = [], sources = [] }): Object => {
  const result = event;
  const coord =
    places && places.find(p => event.place && event.place.name === p.name);
  const source =
    sources &&
    sources.find(s => event.source && event.source.pointer === s.pointer);

  if (coord) {
    result.place = {
      ...event.place,
      lat: coord.lat,
      lng: coord.lng,
    };
  }

  if (source) {
    result.source = {
      ...event.source,
      name: source.name,
    };
  }
  return { ...event };
};

export { findTags, addDetails, getEventDetails };
