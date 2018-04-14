// @flow
const getClassNamePercent = (percent: number) => {
  if (percent >= 75) {
    return "color-color-scheme";
  }

  if (percent >= 50 && percent < 75) {
    return "color-warning";
  }

  if (percent >= 25 && percent < 50) {
    return "color-orange";
  }

  return "color-red";
};

// eslint-disable-next-line import/prefer-default-export
export { getClassNamePercent };
