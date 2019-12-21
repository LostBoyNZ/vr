import * as moment from "moment";
import * as _ from "lodash";

export class DateTools {
  constructor() {}
  private handlingTimeDays = 1;

  private publicHolidayDates = [
    "2019-12-25",
    "2019-12-26",
    "2020-01-01",
    "2020-01-02",
    "2020-02-06",
    "2020-04-10",
    "2020-04-13",
    "2020-04-25",
    "2020-06-01",
    "2020-10-26",
    "2020-12-25",
    "2020-12-28",
    "2021-01-01",
    "2021-01-04",
    "2021-02-08",
    "2021-04-02",
    "2021-04-05",
    "2021-04-26",
    "2021-06-07",
    "2021-10-25",
    "2021-12-27",
    "2021-12-28",
    "2022-01-03",
    "2022-01-04"
  ];

  private regionalHolidays = {
    auckland: ["2020-01-27", "2021-02-01"],
    canterbury: ["2020-11-13", "2021-11-12"],
    chathamIslands: ["2020-11-30", "2021-11-30"],
    hawkesBay: ["2020-10-23", "2021-10-22"],
    marlborough: ["2020-11-02", "2021-11-01"],
    nelson: ["2020-02-03", "2021-02-01"],
    otago: ["2020-03-23", "2021-03-22"],
    southCanterbury: ["2020-09-28", "2021-09-27"],
    southland: ["2020-04-14", "2021-04-06"],
    taranaki: ["2020-03-09", "2021-03-08"],
    wellington: ["2020-01-20", "2021-01-25"],
    westland: ["2020-11-30", "2021-11-30"]
  };

  public isExcludedDate(date: Date): boolean {
    const dateToCheck: string = this.formatDateDisplay(date, "YYYY-MM-DD");

    const isPublicHoliday = _.includes(this.publicHolidayDates, dateToCheck);
    const isWeekendDate = this.isWeekendDate(date);

    // console.log('date: ', date);
    // console.log(isPublicHoliday.toString());
    // console.log(isWeekendDate.toString());

    return isPublicHoliday || isWeekendDate;
  }

  private isWeekendDate(date: Date): boolean {
    const day = date.getDay();

    return day === 0 || day === 6;
  }

  public formatDateDisplay(date: Date, format: string): string {
    return moment(date).format(format);
  }

  public isDateSameOrAfter(baseDate: string, newDate: string): boolean {
    if (baseDate && newDate) {
      const firstDate: string = baseDate.toLocaleString().split(",")[0];
      const secondDate: string = newDate.toLocaleString().split(",")[0];
      return moment(secondDate).isSameOrAfter(firstDate);
    } else {
      return false;
    }
  }

  public isDateAfter(baseDate: string, newDate: string): boolean {
    if (baseDate && newDate) {
      const firstDate: string = baseDate.toLocaleString().split(",")[0];
      const secondDate: string = newDate.toLocaleString().split(",")[0];
      return moment(secondDate).isAfter(firstDate);
    } else {
      return false;
    }
  }

  public calcNumberOfNightsFromDates(
    startDate: string,
    endDate: string
  ): number {
    return moment(endDate).diff(moment(startDate), "days");
  }

  public getEarliestRentalDateFromDate(
    requestedDate: string,
    minDaysInTransit: number,
    overrideHandlingTimeDays = this.handlingTimeDays
  ): string {
    // TODO: This will vary depending what time of day someone places the booking
    minDaysInTransit += overrideHandlingTimeDays;
    const result = new Date(requestedDate);

    while (minDaysInTransit > 0) {
      result.setDate(result.getDate() + 1);
      if (!this.isExcludedDate(result)) {
        minDaysInTransit--;
      } else {
      }
    }

    return result.toDateString();
  }
}
