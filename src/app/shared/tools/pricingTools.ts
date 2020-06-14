import pricing from "../../../data/pricing.json";
import {ShippingTypes} from '../../checkout/checkout.component';

export class PricingTools {
  private pricing = pricing;

  constructor(pricingScheme = pricing) {
    this.pricing = pricingScheme;
  }

  public removeGst(price: number): number {
    return price - ((price * 3) / 23);
  }

  public formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  private doesIdExist(id: number | string): boolean {
    return this.pricing[id] ? true : false;
  }

  private pricingIsSameRegardlessOfRentalLength(pricingId: number): boolean {
    return this.pricing[pricingId][`setPriceForAnyLength`] > 0;
  }

  private getPriceForNight(pricingId: number, nights: number): number {
    if (this.pricing[pricingId][nights.toString()]) {
      return this.pricing[pricingId][nights.toString()];
    } else {
      if (this.pricing[pricingId][`baseNights`]) {
        const minNights = this.pricing[pricingId][`baseNights`];
        if (nights <= minNights) {
          return this.pricing[pricingId][`basePrice`];
        }
      }

      if (this.pricing[pricingId][`extraNight`]) {
        const extraNight = this.pricing[pricingId][`extraNight`];
        const sevenNightPrice = this.pricing[pricingId][`7`];
        return sevenNightPrice + extraNight * (nights - 7);
      }
    }
  }

  public getPriceByPricingIdAndNights(
    pricingId: number,
    nights: number
  ): number {
    if (this.doesIdExist(pricingId)) {
      if (this.pricingIsSameRegardlessOfRentalLength(pricingId)) {
        return this.pricing[pricingId][`setPriceForAnyLength`];
      } else {
        return this.getPriceForNight(pricingId, nights);
      }
    } else {
      console.error(`Error: Pricing scheme ID of ${pricingId} does not exist`);
      return 0;
    }
  }

  public getShippingPriceForType(
    shippingType: ShippingTypes,
  ): number {
    if (this.doesIdExist('shipping')) {
      const shippingOptionsWithPrice = this.pricing['shipping'];
      if (shippingOptionsWithPrice[shippingType]) {
        return shippingOptionsWithPrice[shippingType];
      } else {
          console.error(`Error: Pricing scheme ID of shipping does not exist`);
          return 0;
        }
    } else {
      console.error(`Error: Pricing scheme ID of shipping does not exist`);
      return 0;
    }
  }
}
