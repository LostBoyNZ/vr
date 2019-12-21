import {PricingTools} from './pricingTools';

describe('The tool to remove GST', () => {
  it('should return the correct amount', () => {
    const pricingTools = new PricingTools();
    const expected = 86.09;

    expect(pricingTools.removeGst(99)).toBeCloseTo(expected, 0.01);
  });
});

describe('Pricing Tools', () => {
  let pricingTools: PricingTools;

  const mockPricing = {
    "1": {
      "setPriceForAnyLength": 0,
      "baseNights": 3,
      "basePrice": 69,
      "4": 77,
      "5": 85,
      "6": 93,
      "7": 99,
      "extraNight": 14
    },
    "2": {
      "setPriceForAnyLength": 10
    }
  }

  beforeAll(() => {
    pricingTools = new PricingTools(mockPricing);
  });

  describe('The get price tool', () => {
    it('should return a set price for any number of nights if set price is set', () => {
      const expected = 10;

      expect(pricingTools.getPriceByPricingIdAndNights(2, 1)).toBe(expected);
      expect(pricingTools.getPriceByPricingIdAndNights(2, 4)).toBe(expected);
      expect(pricingTools.getPriceByPricingIdAndNights(2, 14)).toBe(expected);
    });

    it('should return a price for the min number of nights if a base price is not set', () => {
      const expected = 69;

      expect(pricingTools.getPriceByPricingIdAndNights(1, 1)).toBe(expected);
    });

    it('should return a price for the min number of nights if given a bad number of nights', () => {
      const expected = 69;

      expect(pricingTools.getPriceByPricingIdAndNights(1, 0.5)).toBe(expected);
      expect(pricingTools.getPriceByPricingIdAndNights(1, -1)).toBe(expected);
    });

    it('should return a price for the min number of nights if the nights is at or below min nights', () => {
      const expected = 69;

      expect(pricingTools.getPriceByPricingIdAndNights(1, 1)).toBe(expected);
      expect(pricingTools.getPriceByPricingIdAndNights(1, 2)).toBe(expected);
      expect(pricingTools.getPriceByPricingIdAndNights(1, 3)).toBe(expected);
    });

    it('should return a price for four nights if four nights is requested', () => {
      const expected = 77;

      expect(pricingTools.getPriceByPricingIdAndNights(1, 4)).toBe(expected);
    });

    it('should return a calculated price for eight nights if eight nights is requested', () => {
      const expected = 113;

      expect(pricingTools.getPriceByPricingIdAndNights(1, 8)).toBe(expected);
    });

  });
});
