import moment from 'moment';
import removeAccents from 'remove-accents-diacritics';
import leftPad from 'left-pad';

class Date {
  constructor(raw) {
    this.raw = raw;
  }

  isValid() {
    return moment(this.raw).isValid();
  }

  isYear(element) {
    return element.length === 4 && Number.isInteger(parseInt(element, 10));
  }

  isMonth(element) {
    const january = {
      en: ['january', 'jan'],
      fr: ['janvier', 'jan'],
    };
    const february = {
      en: ['february', 'feb'],
      fr: ['fevrier', 'fev'],
    };
    const march = {
      en: ['march', 'mar'],
      fr: ['mars', 'mar'],
    };
    const april = {
      en: ['april', 'apr'],
      fr: ['avril', 'avr'],
    };
    const may = {
      en: ['may'],
      fr: ['mai'],
    };
    const june = {
      en: ['june', 'jun'],
      fr: ['juin'],
    };
    const july = {
      en: ['july', 'jul'],
      fr: ['juillet', 'jui'],
    };
    const august = {
      en: ['august', 'aug'],
      fr: ['aout', 'aou'],
    };
    const september = {
      en: ['september', 'sep', 'sept'],
      fr: ['septembre', 'sep', 'sept'],
    };
    const october = {
      en: ['october', 'oct'],
      fr: ['octobre', 'oct'],
    };
    const november = {
      en: ['november', 'nov'],
      fr: ['novembre', 'nov'],
    };
    const december = {
      en: ['december', 'dec'],
      fr: ['decembre', 'dec'],
    };

    const months = [
      ...january.fr, ...january.en,
      ...february.fr, ...february.en,
      ...march.fr, ...march.en,
      ...april.fr, ...april.en,
      ...may.fr, ...may.en,
      ...june.fr, ...june.en,
      ...july.fr, ...july.en,
      ...august.fr, ...august.en,
      ...september.fr, ...september.en,
      ...october.fr, ...october.en,
      ...november.fr, ...november.en,
      ...december.fr, ...december.en,
    ];
    return element.length > 0 && !Number.isInteger(parseInt(element, 10)) && months.includes(element);
  }

  isDay(element) {
    const isNumber = Number.isInteger(parseInt(element, 10));
    return element.length > 0 && element.length <= 2 && isNumber && parseInt(element, 10) <= 31;
  }

  convert() {
    const dateArray = this.raw.split(' ');

    let year;
    let month;
    let day;
    dateArray.forEach((element) => {
      if (this.isYear(element)) {
        year = parseInt(element, 10);
      }

      const elementCleaned = removeAccents.remove(element).toLowerCase();
      if (this.isMonth(elementCleaned)) {
        month = parseInt(this.getMonth(elementCleaned), 10);
      }

      if (this.isDay(element)) {
        day = parseInt(leftPad(parseInt(element, 10), 2, '0'), 10);
      }
    });

    if (year) {
      const date = moment().month(0).date(1);
      [year, month, day].forEach((element, index) => {
        if (index === 0 && element) {
          date.year(element);
        }
        if (index === 1 && element) {
          date.month(element);
        }
        if (index === 2 && element) {
          date.date(element);
        }
      });

      return date.format('YYYY-MM-DD');
    }

    return null;
  }

  isJanuary(month) {
    const clean = removeAccents.remove(month).toLowerCase();
    return ['janvier', 'jan', 'january'].includes(clean);
  }

  isFebruary(month) {
    const clean = removeAccents.remove(month).toLowerCase();
    return ['fevrier', 'fevr', 'fev', 'feb', 'febr', 'february'].includes(clean);
  }

  getMonth(month) {
    if (this.isJanuary(month)) {
      return 0;
    }
    if (this.isFebruary(month)) {
      return 1;
    }
    if (['mars', 'mar', 'march'].includes(month)) {
      return 2;
    }
    if (['avril', 'avr', 'apr', 'april'].includes(month)) {
      return 3;
    }
    if (['mai', 'may'].includes(month)) {
      return 4;
    }
    if (['juin', 'june', 'jun'].includes(month)) {
      return 5;
    }
    if (['juillet', 'jui', 'juil', 'july', 'jul'].includes(month)) {
      return 6;
    }
    if (['aout', 'aou', 'august', 'aug'].includes(month)) {
      return 7;
    }
    if (['septembre', 'sept', 'september', 'sep'].includes(month)) {
      return 8;
    }
    if (['octobre', 'oct', 'october'].includes(month)) {
      return 9;
    }
    if (['novembre', 'nov', 'november'].includes(month)) {
      return 10;
    }
    if (['decembre', 'dec', 'december'].includes(month)) {
      return 11;
    }
    return month;
  }

  format() {
    this.date = this.convert();
    return this.date;
  }
}

export default Date;
