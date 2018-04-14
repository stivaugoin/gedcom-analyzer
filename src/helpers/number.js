// @flow

const round = (number: number, precision: number) => {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

const percent = (quantity: number, total: number) => {
  if (!quantity) {
    return 0;
  }

  return round(quantity * 100 / total, 1);
};

export { round, percent };
