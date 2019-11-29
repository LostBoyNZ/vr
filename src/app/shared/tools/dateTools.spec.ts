import { DateTools} from './dateTools';

import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('Date Tools', () => {
  let dateTools: DateTools;

  beforeAll(() => {
    dateTools = new DateTools();
  });

  describe('Excluded date checker', () => {
    it('should return excluded date when given Christmas day', () => {
      const actual: boolean = dateTools.isExcludedDate(new Date('2019-12-25'));

      expect(actual).toBeTruthy();
    });

    it('should return excluded date when given weekends are not excluded when given weekdays', () => {
      const mon: boolean = dateTools.isExcludedDate(new Date('2019-11-25'));
      const tue: boolean = dateTools.isExcludedDate(new Date('2019-11-26'));
      const wed: boolean = dateTools.isExcludedDate(new Date('2019-11-27'));
      const thur: boolean = dateTools.isExcludedDate(new Date('2019-11-28'));
      const fri: boolean = dateTools.isExcludedDate(new Date('2019-11-29'));
      const sat: boolean = dateTools.isExcludedDate(new Date('2019-11-30'));
      const sun: boolean = dateTools.isExcludedDate(new Date('2019-12-01'));

      expect(mon).toBeFalsy();
      expect(tue).toBeFalsy();
      expect(wed).toBeFalsy();
      expect(thur).toBeFalsy();
      expect(fri).toBeFalsy();
      expect(sat).toBeTruthy();
      expect(sun).toBeTruthy();
    });
  });

  describe('Date comparison checker', () => {
    it('should determine if a date is the same or after when compared to the same date', () => {
      const dateOne = new Date('2019-12-01').toDateString();
      const dateTwo = new Date('2019-12-01').toDateString();
      const sameDate: boolean = dateTools.isDateSameOrAfter(dateOne, dateTwo);

      expect(sameDate).toBeTruthy();
    });

    it('should determine if a date is the same or after when compared to a later date', () => {
      const dateOne = new Date('2019-12-01').toDateString();
      const dateTwo = new Date('2019-12-02').toDateString();
      const laterDate: boolean = dateTools.isDateSameOrAfter(dateOne, dateTwo);

      expect(laterDate).toBeTruthy();
    });

    it('should determine if a date is the same or after when compared to an earlier date', () => {
      const dateOne = new Date('2019-12-01').toDateString();
      const dateTwo = new Date('2019-11-30').toDateString();
      const earlierDate: boolean = dateTools.isDateSameOrAfter(dateOne, dateTwo);

      expect(earlierDate).toBeFalsy();
    });
  });

  describe('Calculating the earliest date', () => {
    it('should be correct when given Monday and no handling days', () => {
      const expectedDate: string = new Date('2019-12-05').toDateString();
      const result: string = dateTools.getEarliestRentalDateFromDate(new Date('2019-12-02').toDateString(), 3, 0);

      expect(result).toEqual(expectedDate);
    });

    it('should be correct when given Monday and default handling days', () => {
      const expectedDate: string = new Date('2019-12-06').toDateString();
      const result: string = dateTools.getEarliestRentalDateFromDate(new Date('2019-12-02').toDateString(), 3);

      expect(result).toEqual(expectedDate);
    });

    it('should be correct when given Thursday and no handling days', () => {
      const expectedDate: string = new Date('2019-12-03').toDateString();
      const result: string = dateTools.getEarliestRentalDateFromDate(new Date('2019-11-28').toDateString(), 3, 0);

      expect(result).toEqual(expectedDate);
    });
  });
});
