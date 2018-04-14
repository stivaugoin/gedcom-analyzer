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
  sources?: Array<Source>,
} => {
  const place = findTags(tree, "PLAC");
  const date = findTags(tree, "DATE");
  const sources = findTags(tree, "SOUR");

  const result = {};

  if (place.length && place[0] && place[0].data) {
    result.place = {};
    result.place.name = place[0] && place[0].data;
  }
  if (date.length && date[0] && date[0].data) {
    result.date = new Dates(date[0].data).format();
  }

  if (sources.length > 0) {
    const allSources = sources.map(
      source =>
        source.data && {
          pointer: source.data.slice(1, -1),
        }
    );

    if (allSources.filter(source => source).length > 0) {
      result.sources = allSources.filter(source => source);
    }
  }

  return result;
};

// $FlowFixMe
const addDetails = (event, { places = [], sources = [] }): Object => {
  const result = event;
  const coord =
    places && places.find(p => event.place && event.place.name === p.name);

  if (coord) {
    result.place = {
      ...event.place,
      lat: coord.lat,
      lng: coord.lng,
    };
  }

  if (event.sources && event.sources.length > 0 && sources.length > 0) {
    result.sources = event.sources.map(eventSource => {
      const source = sources.find(
        s => eventSource && eventSource.pointer === s.pointer
      );

      if (source) {
        return {
          ...eventSource,
          name: source.name,
        };
      }

      return {};
    });
  }

  return { ...result };
};

export { findTags, addDetails, getEventDetails };
