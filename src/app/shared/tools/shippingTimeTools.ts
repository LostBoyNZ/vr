import * as _ from 'lodash';

export class ShippingTimeTools {

  constructor() { }

  public getMinDaysInTransit(postcode: number): number {
    return 7;
  }
}
