import moment from "moment";
import removeAccents from "remove-accents";
import leftPad from "left-pad";

import { getMonth, isYear, isMonth, isDay } from "../helpers/dates";

class Date {
  constructor(raw) {
    this.raw = raw;
  }

  isValid() {
    return moment(this.raw).isValid();
  }

  convert() {
    const dateArray = this.raw.split(" ");

    let year;
    let month;
    let day;
    dateArray.forEach(element => {
      if (isYear(element)) {
        year = parseInt(element, 10);
      }

      const elementCleaned = removeAccents.remove(element).toLowerCase();
      if (isMonth(elementCleaned)) {
        month = parseInt(getMonth(elementCleaned), 10);
      }

      if (isDay(element)) {
        day = parseInt(leftPad(parseInt(element, 10), 2, "0"), 10);
      }
    });

    if (year) {
      const date = moment()
        .month(0)
        .date(1);
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

      return date.format("YYYY-MM-DD");
    }

    return null;
  }

  format() {
    this.date = this.convert();
    return this.date;
  }
}

export default Date;
