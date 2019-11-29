import {PostcodeTools} from './postcodeTools';

describe('Postcode Tools', () => {
  let postcodeTools: PostcodeTools;

  beforeAll(() => {
    postcodeTools = new PostcodeTools();
  });

  describe('The check for where in NZ a post code is', () => {
    it('should know if a post code is local when given a local post code', () => {
      const result: boolean = postcodeTools.isPostcodeLocal('7691');

      expect(result).toBeTruthy();
    });

    it('should know if a post code is not local when given a non-local post code', () => {
      const result: boolean = postcodeTools.isPostcodeLocal('9800');

      expect(result).toBeFalsy();
    });

    it('should know if a post code is in the south island when given a south island post code', () => {
      const result: boolean = postcodeTools.isPostcodeInOtherSouthIsland('9800');

      expect(result).toBeTruthy();
    });

    it('should know if a post code is not in the south island when given a north island post code', () => {
      const result: boolean = postcodeTools.isPostcodeInOtherSouthIsland('5400');

      expect(result).toBeFalsy();
    });

    it('should know if a post code is in the north island when given a north island post code', () => {
      const result: boolean = postcodeTools.isPostcodeInNorthIsland('1200');

      expect(result).toBeTruthy();
    });

    it('should know if a post code is not in the north island when given a south island post code', () => {
      const result: boolean = postcodeTools.isPostcodeInNorthIsland('7691');

      expect(result).toBeFalsy();
    });
  });

  describe('The minimum days in transit calculator', () => {
    it('should return the right number of days when given a local post code', () => {
      const result: number = postcodeTools.getMinDaysInTransit('7691', false);

      expect(result).toEqual(1);
    });

    it('should return the right number of days when given a south island other post code', () => {
      const result: number = postcodeTools.getMinDaysInTransit('9800', false);

      expect(result).toEqual(1);
    });

    it('should return the right number of days when given a north island other post code', () => {
      const result: number = postcodeTools.getMinDaysInTransit('1200', false);

      expect(result).toEqual(1);
    });

    it('should add an extra day when an address is rural', () => {
      const result: number = postcodeTools.getMinDaysInTransit('7691', true);

      expect(result).toEqual(2);
    });
  });
});
