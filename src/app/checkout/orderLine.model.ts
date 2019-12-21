import {IOrderLine} from './checkout.component';

export class Order {
  public orderLines: OrderLine[];
}

export class OrderLine implements IOrderLine {
  constructor(
    public id: number,
    public qty: number,
  ) {}
}
