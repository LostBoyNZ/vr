import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-checkout-carousel',
  templateUrl: './checkout-carousel.component.html',
  styleUrls: ['./checkout-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutCarouselComponent implements OnInit {

  @Output() orderChange = new EventEmitter();

  products = [ {
    brand: 'Zotac',
    model: 'Desktop PC',
    image: 'assets/products/desktop-pc/500x500.jpg',
    qty: 0,
  }, {
    brand: 'HP',
    model: 'Reverb',
    image: 'assets/products/hp-reverb/500x500.jpg',
    qty: 0,
  }, {
      brand: 'HTC',
      model: 'Vive',
      image: 'assets/products/htc-vive/500x500.jpg',
      qty: 0,
  }, {
    brand: 'HTC',
    model: 'Vive Cosmos',
    image: 'assets/products/htc-vive-cosmos/500x500.jpg',
    qty: 0,
  }, {
    brand: 'HTC',
    model: 'Vive Pro',
    image: 'assets/products/htc-vive-pro/500x500.jpg',
    qty: 0,
  }, {
    brand: 'Lightstands',
    model: '',
    image: 'assets/products/lightstands/500x500.jpg',
    qty: 0,
  }]
  productImages = [
    'assets/products/desktop-pc/500x500.jpg',
    'assets/products/hp-reverb/500x500.jpg',
    'assets/products/htc-vive/500x500.jpg',
    'assets/products/htc-vive-cosmos/500x500.jpg',
    'assets/products/htc-vive-pro/500x500.jpg',
    'assets/products/lightstands/500x500.jpg'
  ];
  public carouselTileItems: Array<any> = [0, 1, 2, 3, 4, 5];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 4, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  constructor(private _cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

  ngOnInit() {
    this.carouselTileItems.forEach(el => {
      this.carouselTileLoad(el);
    });
  }

  public carouselTileLoad(j) {
    const len = this.carouselTiles[j].length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTiles[j].push(
          this.productImages[Math.floor(Math.random() * this.productImages.length)]
        );
      }
    }
  }

  public changeValue(item, newQty) {
    this.orderChange.emit({productId: item, qty: newQty});

    console.log('item: ', item);

    this.products[item].qty = newQty;
  }
}
