// @flow
import removeAccents from "remove-accents";

export const isYear = (element: string): boolean =>
  element.length === 4 && Number.isInteger(parseInt(element, 10));

export const isJanuary = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["janvier", "jan", "january"].includes(clean);
};

export const isFebruary = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["fevrier", "fevr", "fev", "feb", "febr", "february"].includes(clean);
};

export const isMarch = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["mars", "mar", "march"].includes(clean);
};

export const isApril = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["avril", "avr", "apr", "april"].includes(clean);
};

export const isMay = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["mai", "may"].includes(clean);
};

export const isJune = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["juin", "june", "jun"].includes(clean);
};

export const isJuly = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["juillet", "jui", "juil", "july", "jul"].includes(clean);
};

export const isAugust = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["aout", "aou", "august", "aug"].includes(clean);
};

export const isSeptember = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["septembre", "sept", "september", "sep"].includes(clean);
};

export const isOctober = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["octobre", "oct", "october"].includes(clean);
};

export const isNovember = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["novembre", "nov", "november"].includes(clean);
};

export const isDecember = (month: string): boolean => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["decembre", "dec", "december"].includes(clean);
};

export const isMonth = (element: string): boolean => {
  if (element.length === 0 || Number.isInteger(parseInt(element, 10))) {
    return false;
  }

  return (
    isJanuary(element) ||
    isFebruary(element) ||
    isMarch(element) ||
    isApril(element) ||
    isMay(element) ||
    isJune(element) ||
    isJuly(element) ||
    isAugust(element) ||
    isSeptember(element) ||
    isOctober(element) ||
    isNovember(element) ||
    isDecember(element)
  );
};

export const isDay = (element: string): boolean => {
  const isNumber = Number.isInteger(parseInt(element, 10));
  return (
    element.length > 0 &&
    element.length <= 2 &&
    isNumber &&
    parseInt(element, 10) <= 31
  );
};

export const getMonth = (month: string): number | null => {
  if (isJanuary(month)) {
    return 0;
  }
  if (isFebruary(month)) {
    return 1;
  }
  if (isMarch(month)) {
    return 2;
  }
  if (isApril(month)) {
    return 3;
  }
  if (isMay(month)) {
    return 4;
  }
  if (isJune(month)) {
    return 5;
  }
  if (isJuly(month)) {
    return 6;
  }
  if (isAugust(month)) {
    return 7;
  }
  if (isSeptember(month)) {
    return 8;
  }
  if (isOctober(month)) {
    return 9;
  }
  if (isNovember(month)) {
    return 10;
  }
  if (isDecember(month)) {
    return 11;
  }
  return null;
};
