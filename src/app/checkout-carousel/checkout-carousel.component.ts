import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { NguCarouselConfig } from "@stockopedia/carousel";
import {CheckoutComponent, IOrderLine} from '../checkout/checkout.component';
import products from "../../data/products.json";
import {PricingTools} from '../shared/tools/pricingTools';

export enum CarouselTileDisplayType {
  IMAGE = "image",
  CONTENTS = "contents",
  SPECS = "specs",
}

@Component({
  selector: "app-checkout-carousel",
  templateUrl: "./checkout-carousel.component.html",
  styleUrls: ["./checkout-carousel.component.scss"],
})

export class CheckoutCarouselComponent implements OnInit {
  @Input() checkout: CheckoutComponent;

  @Input() allOrderLines: IOrderLine[];

  @Output() orderChange = new EventEmitter();

  public carouselTileItems: Array<any> = [];
  public carouselTileDisplay: Array<CarouselTileDisplayType>;
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 4, all: 0 },
    slide: 2,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    animation: 'lazy',
    easing: "cubic-bezier(0, 0, 0.2, 1)"
  };
  public pricingTools = new PricingTools();
  public products = products;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

  ngOnInit() {
    this.setCarouselTileItems();
  }

  private setCarouselTileItems() {
    // Each carousel tile item is a product id
    this.carouselTileItems = Array.from(
      (this.carouselTileItems = Object.keys(this.products))
    );

    // Start each carousel tile as showing the product image
    const numberOfProducts = Object.keys(this.products).length;
    this.carouselTileDisplay = new Array<CarouselTileDisplayType>(numberOfProducts);
    this.carouselTileDisplay.fill(CarouselTileDisplayType.IMAGE);
  }

  public getPrice(productId: number): number {
    return this.checkout.getPriceByProductId(productId, this.getQty(productId));
  }

  public getQty(productId: number): number {
    if (productId !== undefined) {
      const index = this.allOrderLines.findIndex(
        orderLine => orderLine.id === productId
      );
      if (index >= 0) {
        return this.allOrderLines[index].qty;
      } else {
        return 0;
      }
    }
  }

  public changeQty(id, qtyChange) {
    this.orderChange.emit({ id, qtyChange });
  }

  public changeCarouselTileDisplay(id) {
    if (this.carouselTileDisplay[id] === CarouselTileDisplayType.CONTENTS) {
      this.carouselTileDisplay[id] = CarouselTileDisplayType.IMAGE;
    } else {
      this.carouselTileDisplay[id] = CarouselTileDisplayType.CONTENTS;
    }
  }

  createImageUrl(url: string): string {
    return `assets/products/${url}/500x500.jpg`;
  }
}
