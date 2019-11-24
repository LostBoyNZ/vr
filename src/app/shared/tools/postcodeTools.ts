import * as _ from 'lodash';

export class PostcodeTools {
  private localAreaCodes = ['74', '75', '76', '80', '81', '82', '84', '85', '86', '88', '89'];
  private southIslandOtherAreaCodes = ['70', '71', '72', '73', '77', '78', '79', '90', '92', '93', '94', '95', '96', '97', '98'];
  private minDaysInTransitByArea = {
    local: 1,
    northIsland: 1,
    southIsland: 1,
  };
  private extraDaysInTransitForRural = 1;

  constructor() {}

  public getMinDaysInTransit(postcode: number, ruralDelivery: boolean): number {
    let days = 0;

    if (ruralDelivery) {
      days += this.extraDaysInTransitForRural;
    }

    if (this.isPostcodeLocal(postcode)) {
      days += this.minDaysInTransitByArea.local;
    } else if (this.isPostcodeInOtherSouthIsland(postcode)) {
      days += this.minDaysInTransitByArea.southIsland;
    } else {
      days += this.minDaysInTransitByArea.northIsland;
    }

    return days;
  }

  public isPostcodeLocal(postcode): boolean {
    return _.includes(this.localAreaCodes, this.getAreaCode(postcode));
  }

  public isPostcodeInOtherSouthIsland(postcode): boolean {
    return _.includes(this.southIslandOtherAreaCodes, this.getAreaCode(postcode));
  }

  public isPostcodeInNorthIsland(postcode): boolean {
    return !_.includes(this.southIslandOtherAreaCodes && this.localAreaCodes, this.getAreaCode(postcode));
  }

  public isPostcodeRural(postcode): boolean {
    // TODO: Add a check here to see if an address is rural delivery or not
    return false;
  }

  private getAreaCode(postcode): string {
    return postcode.substring(0, 2);
  }
}
