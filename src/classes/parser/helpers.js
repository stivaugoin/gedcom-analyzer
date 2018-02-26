// @flow
import Date from "../Dates";

const findTags = (
  data: Array<{ tag: string }>,
  tag: string
): Array<{ data: string, tree: Array<{ tag: string }> }> => {
  const d = data.filter((el: { tag: string }) => el.tag === tag);

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

const getPlaceDate = (tree: Array<{ tag: string }>) => {
  const place = findTags(tree, "PLAC");
  const date = findTags(tree, "DATE");

  if (!place.length && !date.length) {
    return {};
  }

  const result = {};
  if (place.length) {
    result.place = place[0] && place[0].data;
  }
  if (date.length) {
    const d = date[0] && date[0].data;
    result.date = new Date(d).format();
  }
  return result;
};

export { findTags, getPlaceDate };
