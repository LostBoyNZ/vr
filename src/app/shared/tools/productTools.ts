import products from "../../../data/products.json";

export class ProductTools {
  private products = products;

  constructor(productRange = products) {
    this.products = productRange;
  }

  private doesIdExist(id: number): boolean {
    return this.products[id] ? true : false;
  }

  public getPricingSchemeId(productId: number): number {
    if (this.doesIdExist(productId)) {
      if (this.products[productId]) {
        return this.products[productId][`pricingSchemeId`];
      } else {
        return 0;
      }
    } else {
      console.error(`Error: Product ID of ${productId} does not exist`);
      return 0;
    }
  }
}
