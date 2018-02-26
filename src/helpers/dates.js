import removeAccents from "remove-accents";

export const isYear = element =>
  element.length === 4 && Number.isInteger(parseInt(element, 10));

export const isMonth = element => {
  const january = {
    en: ["january", "jan"],
    fr: ["janvier", "jan"],
  };
  const february = {
    en: ["february", "feb"],
    fr: ["fevrier", "fev"],
  };
  const march = {
    en: ["march", "mar"],
    fr: ["mars", "mar"],
  };
  const april = {
    en: ["april", "apr"],
    fr: ["avril", "avr"],
  };
  const may = {
    en: ["may"],
    fr: ["mai"],
  };
  const june = {
    en: ["june", "jun"],
    fr: ["juin"],
  };
  const july = {
    en: ["july", "jul"],
    fr: ["juillet", "jui"],
  };
  const august = {
    en: ["august", "aug"],
    fr: ["aout", "aou"],
  };
  const september = {
    en: ["september", "sep", "sept"],
    fr: ["septembre", "sep", "sept"],
  };
  const october = {
    en: ["october", "oct"],
    fr: ["octobre", "oct"],
  };
  const november = {
    en: ["november", "nov"],
    fr: ["novembre", "nov"],
  };
  const december = {
    en: ["december", "dec"],
    fr: ["decembre", "dec"],
  };

  const months = [
    ...january.fr,
    ...january.en,
    ...february.fr,
    ...february.en,
    ...march.fr,
    ...march.en,
    ...april.fr,
    ...april.en,
    ...may.fr,
    ...may.en,
    ...june.fr,
    ...june.en,
    ...july.fr,
    ...july.en,
    ...august.fr,
    ...august.en,
    ...september.fr,
    ...september.en,
    ...october.fr,
    ...october.en,
    ...november.fr,
    ...november.en,
    ...december.fr,
    ...december.en,
  ];
  return (
    element.length > 0 &&
    !Number.isInteger(parseInt(element, 10)) &&
    months.includes(element)
  );
};

export const isDay = element => {
  const isNumber = Number.isInteger(parseInt(element, 10));
  return (
    element.length > 0 &&
    element.length <= 2 &&
    isNumber &&
    parseInt(element, 10) <= 31
  );
};

export const isJanuary = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["janvier", "jan", "january"].includes(clean);
};

export const isFebruary = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["fevrier", "fevr", "fev", "feb", "febr", "february"].includes(clean);
};

export const isMarch = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["mars", "mar", "march"].includes(clean);
};

export const isApril = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["avril", "avr", "apr", "april"].includes(clean);
};

export const isMay = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["mai", "may"].includes(clean);
};

export const isJune = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["juin", "june", "jun"].includes(clean);
};

export const isJuly = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["juillet", "jui", "juil", "july", "jul"].includes(clean);
};

export const isAugust = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["aout", "aou", "august", "aug"].includes(clean);
};

export const isSeptember = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["septembre", "sept", "september", "sep"].includes(clean);
};

export const isOctober = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["octobre", "oct", "october"].includes(clean);
};

export const isNovember = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["novembre", "nov", "november"].includes(clean);
};

export const isDecember = month => {
  const clean = removeAccents.remove(month).toLowerCase();
  return ["decembre", "dec", "december"].includes(clean);
};

export const getMonth = month => {
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
  return month;
};
