import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialModule} from './angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CheckoutAddressComponent} from './checkout/checkout-address/checkout-address.component';
import {DialogSimpleComponent} from './shared/components/dialog-simple/dialog-simple.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDialogService} from './shared/components/confirm-dialog/confirm-dialog.service';
import {DialogVerifyAddressComponent} from './checkout/checkout-address/dialog-verify-address/dialog-verify-address.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    CheckoutAddressComponent,
    ProductAddComponent,
    ProductGetComponent,
    ProductEditComponent,
    RadioFormComponent,
    TextFormComponent,
    NumberFormComponent,
    SingleDateFormComponent,
    CheckoutCarouselComponent,
    CollapseComponent,
    DialogSimpleComponent,
    DialogVerifyAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NguCarouselModule,
    DynamicFormModule,
    NgxPageScrollCoreModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
  entryComponents: [
  ],
  providers: [
    ProductsService,
    ConfirmDialogService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
