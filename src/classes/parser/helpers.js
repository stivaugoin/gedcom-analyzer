// @flow
import Dates from "../Dates";

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

const getPlaceDate = (tree: Array<any>): { date?: ?string, place?: string } => {
  const place = findTags(tree, "PLAC");
  const date = findTags(tree, "DATE");

  if (!place.length && !date.length) {
    return {};
  }

  const result = {};
  if (place.length) {
    result.place = place[0] && place[0].data;
  }
  if (date.length && date[0] && date[0].data) {
    result.date = new Dates(date[0].data).format();
  }
  return result;
};

const addCoord = (event, places) => {
  const coord = places.find(p => p.name === event.place);
  if (coord) {
    return {
      ...event,
      lat: coord.lat,
      lng: coord.lng,
    };
  }
  return { ...event };
};

export { findTags, addCoord, getPlaceDate };
