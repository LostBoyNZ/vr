import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductGetComponent} from './product-get/product-get.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {RadioFormComponent} from './shared/forms/radio/radio-form.component';
import {TextFormComponent} from './shared/forms/text/text-form.component';
import {NumberFormComponent} from './shared/forms/number/number-form.component';
import {SingleDateFormComponent} from './shared/forms/single-date/single-date-form.component';
import {DatePickerFormComponent} from './shared/forms/date-range/date-picker-form.component';
import {CheckoutCarouselComponent} from './checkout-carousel/checkout-carousel.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'product/create',
    component: ProductAddComponent
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'products',
    component: ProductGetComponent
  },
  {
    path: 'form/radio',
    component: RadioFormComponent
  },
  {
    path: 'form/text',
    component: TextFormComponent
  },
  {
    path: 'form/number',
    component: NumberFormComponent,
  },
  {
    path: 'form/single-date',
    component: SingleDateFormComponent,
  },
  {
    path: 'form/date-picker',
    component: DatePickerFormComponent,
  },
  {
    path: 'checkout-carousel',
    component: CheckoutCarouselComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
