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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ProductsService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
