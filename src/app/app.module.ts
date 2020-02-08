import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialModule} from './angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {AppComponent} from './app.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductGetComponent} from './product-get/product-get.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductsService} from './products.service';
import {RadioFormComponent} from './shared/forms/radio/radio-form.component';
import {TextFormComponent} from './shared/forms/text/text-form.component';
import {NumberFormComponent} from './shared/forms/number/number-form.component';
import {SingleDateFormComponent} from './shared/forms/single-date/single-date-form.component';
import {NguCarouselModule} from '@stockopedia/carousel';
import {CheckoutCarouselComponent} from './checkout-carousel/checkout-carousel.component';
import {CollapseComponent} from './shared/components/collapse/collapse.component';
import {DynamicFormModule} from './shared/forms/dynamic-form.module';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    ProductAddComponent,
    ProductGetComponent,
    ProductEditComponent,
    RadioFormComponent,
    TextFormComponent,
    NumberFormComponent,
    SingleDateFormComponent,
    CheckoutCarouselComponent,
    CollapseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NguCarouselModule,
    DynamicFormModule,
  ],
  entryComponents: [
  ],
  providers: [
    ProductsService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
