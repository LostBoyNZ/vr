import products from "../../../data/products.json";

export class ProductTools {
  private products = products;

  constructor(productRange = products) {
    this.products = productRange;
  }

  private doesIdExist(id: number): boolean {
    if (!this.products[id]) {
      console.error(`Error: Product ID of ${id} does not exist`);
    }
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
      return 0;
    }
  }

  public doesRequireShipping(productId: number): boolean {
    if (this.doesIdExist(productId)) {
      if (this.products[productId]) {
        return this.products[productId][`requiresShipping`];
      }
    } else {
      return true;
    }
  }
}
