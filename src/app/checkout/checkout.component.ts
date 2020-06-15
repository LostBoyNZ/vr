import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Order, OrderLine } from "./orderLine.model";
import { DateTools } from "../shared/tools/dateTools";
import { PricingTools } from "../shared/tools/pricingTools";
import { ProductTools } from "../shared/tools/productTools";
import * as _ from "lodash";
import { PostcodeTools } from "../shared/tools/postcodeTools";
import { ShippingTimeTools } from "../shared/tools/shippingTimeTools";
import { IDynamicFormConfig } from "../shared/forms/formComponentHandler";
import { CreateDynamicForm } from "../shared/forms/create-dynamic-form";
import { CustomFormValidators } from "../shared/forms/custom-form.validators";
import * as AOS from 'aos';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import moment from 'moment';
import {AddressTypes, ApiCaller} from '../shared/tools/apiCaller';

export interface IQuestion {
  question: string;
  type: string;
  name: string;
  choices?: string[];
  maxCharacters?: number;
  minCharacters?: number;
  minDate?: Date;
  validDatesFilter?: any;
  defaultDates?: { begin: Date; end: Date };
  validators?: any[];
}

export interface IFormAnswer {
  formFieldName: string;
  value: any;
}

export interface IBookingFormDetails {
  rentalType: string;
  shippingAddressType: string;
  companyName: string;
  shippingAddress: string;
  homeAddress: string;
  postcode: number;
  ruralDelivery: string;
  rentalDates: { begin: Date; end: Date };
  productChoice: string;
  name: string;
}

export interface IOrderLine {
  id: number;
  qty: number;
}

export enum RentalTypes {
  INDIVIDUAL = "individual",
  COMPANY = "company",
}

export enum ShippingAddressTypes {
  HOME = "home",
  BUSINESS = "business",
  COLLECTION_POINT = "collection point",
}

export enum FormTypes {
  SINGLE_DATE = "single-date",
  DATE_RANGE = "date-range",
  NUMBER = "number",
  PRODUCT_CHOICE = "product-choice",
  RADIO = "radio",
  TEXT = "text"
}

export enum ShippingTypes {
  OVERNIGHT = "overnight",
  OVERNIGHT_RURAL = "overnight-rural",
  ECONOMY = "economy",
  ECONOMY_RURAL = "economy-rural",
  LOCAL = "local",
  LOCAL_RURAL = "local-rural",
  FREE = "free"
}

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss", "../styles/forms.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  @Input() order: Order;

  @Output() updateOrderQty = new EventEmitter();

  orderFormGroup: FormGroup;
  datesFormGroup: FormGroup;

  public showAll: boolean = false;

  public orderFormRentalType: IDynamicFormConfig;
  public orderFormShippingAddressType: IDynamicFormConfig;
  public orderFormCompanyName: IDynamicFormConfig;
  public orderFormHomeAddress: IDynamicFormConfig;
  public orderFormShippingAddress: IDynamicFormConfig;
  public orderFormPostcode: IDynamicFormConfig;
  public orderFormRuralDelivery: IDynamicFormConfig;
  public orderFormDateRange: IDynamicFormConfig;

  public orderFormConfig: IDynamicFormConfig;

  public maxQuestionReached: number;
  public questions: IQuestion[];
  public formBuilder: FormBuilder = new FormBuilder();
  public orderLinesGroup: FormGroup;
  public allOrderLines: IOrderLine[] = [];
  public postcodeTools: PostcodeTools;
  public shippingTimeTools: ShippingTimeTools;
  public dateTools: DateTools;
  public pricingTools: PricingTools;
  public productTools: ProductTools;
  public validDatesFilter;
  public minDate;
  public calendarTip: string = null;
  public shouldShowGst = true;
  public deliverToBusiness = false;
  public userFormData: IBookingFormDetails = {
    rentalType: null,
    shippingAddressType: null,
    companyName: null,
    shippingAddress: null,
    homeAddress: null,
    postcode: null,
    ruralDelivery: null,
    rentalDates: { begin: null, end: null },
    productChoice: null,
    name: null
  };
  public startDateSummaryText: string;
  public endDateSummaryText: string;

  public myControl = new FormControl();
  public options: string[] = ['One', 'Two', 'Three'];

  public demoShippingAddressApiResponse = {
    "success": true,
    "address": {
      "street_number": 60,
      "street": "Topito",
      "street_type": "Road",
      "suburb": "Tuahiwi",
      "city": "Kaiapoi",
      "is_rural_delivery": true,
      "postcode": "7691",
      "longitude": 172.639,
      "latitude": -43.3288,
      "run_number": "D5079   ",
      "depot_name": "Rangiora Area Depot",
      "country": "New Zealand",
      "dpid": 2112428,
      "pcd_locations": []
    },
    "message_id": "5bac69e1-3345-4426-a3f3-9785da950e77"
  };

  public testForm = new FormGroup({
    // THIS ISN'T CURRENTLY USED
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ])
  });

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    this.createForm();
    this.dateTools = new DateTools();
    this.pricingTools = new PricingTools();
    this.productTools = new ProductTools();
    this.postcodeTools = new PostcodeTools();
    this.shippingTimeTools = new ShippingTimeTools();
  }

  async ngOnInit() {
    ApiCaller.setupBearerTokenIfNotAlreadySet();
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.theStart',
    });
    // AOS.init({
    //   duration: 1400,
    //   once: true,
    //   easing: 'ease',
    // });
    this.validDatesFilter = (date: Date) =>
      this.dateTools.isExcludedDate(date) === false;
    this.setMinDay();
    // this.minDate = new Date(2019, 10, 20); // month count starts at 0 for some reason

    this.orderFormRentalType = {
      inputs: [
        CreateDynamicForm.radioButtons(
          "What type of rental is this?",
          "rentalType",
          null,
          [
            { name: RentalTypes.INDIVIDUAL, value: RentalTypes.INDIVIDUAL.valueOf() },
            { name: RentalTypes.COMPANY, value: RentalTypes.COMPANY.valueOf() }
          ]
        ),
      ]
    };

    this.orderFormShippingAddressType = {
      inputs: [
        CreateDynamicForm.radioButtons(
          "Where would you like it delivered to?",
          "shippingAddressType",
          null,
          [
            { name: ShippingAddressTypes.HOME, value: ShippingAddressTypes.HOME.valueOf() },
            { name: ShippingAddressTypes.BUSINESS, value: ShippingAddressTypes.BUSINESS.valueOf() },
            { name: ShippingAddressTypes.COLLECTION_POINT, value: ShippingAddressTypes.COLLECTION_POINT.valueOf() },
          ]
        ),
      ]
    };

    this.orderFormCompanyName = {
      inputs: [
        CreateDynamicForm.input(
          "What is the business name?",
          "companyName",
          "",
          "",
          [
            CustomFormValidators.isRequired,
          ],
          true,
          false,
          null,
        ),
      ]
    };

    this.orderFormShippingAddress = {
      inputs: [
        CreateDynamicForm.addressAutoComplete(
          "What address would you like it delivered to?",
          "shippingAddress",
          "",
          "",
          [
            CustomFormValidators.isRequired,
          ],
          true,
          false,
          null,
          "text",
          [AddressTypes.POSTAL],
        ),
      ]
    };

    this.orderFormPostcode = {
      inputs: [
        CreateDynamicForm.inputNumber(
          "What is your postcode?",
          "postcode",
          "",
          "",
          [
            CustomFormValidators.isRequired,
            CustomFormValidators.isNumeric,
            CustomFormValidators.noDecimals,
            CustomFormValidators.maxLength(4)
          ],
          true,
          false,
          null,
          "numeric",
          "[0-9]{4}"
        ),
      ]
    };

    this.orderFormRuralDelivery = {
      inputs: [
        CreateDynamicForm.radioButtons(
          "What type of postal address will you use?",
          "ruralDelivery",
          "non rural",
          [
            { name: "Non-Rural", value: "non rural" },
            { name: "Rural", value: "rural" },
          ],
        ),
      ]
    };

    this.orderFormDateRange = {
      inputs: [
        CreateDynamicForm.dateRange(
          "What dates would you like?",
          "rentalDates",
          this.minDate,
          null,
          null,
          this.validDatesFilter,
        ),
      ]
    };
  }

  createForm() {
    this.orderFormGroup = this.formBuilder.group({
      orderLinesArray: this.formBuilder.array([])
    });
    this.datesFormGroup = this.formBuilder.group({
      date: [{ begin: "", end: "" }]
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.setOrderLines(this.order.orderLines);
  }

  get orderLinesArray(): FormArray {
    return this.orderFormGroup.get("orderLinesArray") as FormArray;
  }

  setOrderLines(orderLines: OrderLine[]) {
    const orderLinesFA = this.formBuilder.group(orderLines);

    this.orderFormGroup.setControl("orderLinesArray", orderLinesFA);
  }

  addOrderLine() {
    // const defaultBeginDate: Date = (this.userFormData.rentalDates.begin) ?  this.userFormData.rentalDates.begin : null;
    // const defaultEndDate: Date = (this.userFormData.rentalDates.end) ?  this.userFormData.rentalDates.end : null;
    this.orderLinesArray.push(this.formBuilder.group(new OrderLine(0, 0)));
  }

  public isBeginDateValid(today: Date = new Date()): boolean {
    if (this.userFormData.rentalDates.begin) {
      return (
        !this.dateTools.isExcludedDate(this.userFormData.rentalDates.begin) &&
        this.dateTools.isDateSameOrAfter(
          this.getEarliestRentalDateFromDate(false, today),
          this.userFormData.rentalDates.begin.toDateString()
        )
      );
    } else {
      return true;
    }
  }

  public isExtraPostageCharge(today: Date = new Date()): boolean {
    if (this.userFormData.rentalDates.begin) {
      const startDate: string = this.userFormData.rentalDates.begin.toDateString();

      return this.dateTools.isDateAfter(
        startDate,
        this.getEarliestRentalDateFromDate(true, today)
      );
    } else {
      return false;
    }
  }

  public getEarliestRentalDateFromDate(
    forceEconomyShipping: boolean,
    today: Date = new Date()
  ): string {
    return this.dateTools.getEarliestRentalDateFromDate(
      today.toDateString(),
      this.getMinDaysInTransit(forceEconomyShipping)
    );
  }

  public setMinDay() {
    const minDaysInTransit = this.getMinDaysInTransit(false);
    const today = new Date();
    const minDate: string = this.dateTools.getEarliestRentalDateFromDate(
      today.toDateString(),
      minDaysInTransit
    );
    this.minDate = this.dateTools.formatDateDisplay(
      new Date(minDate),
      "YYYY-MM-DD"
    );
    const extraPostage = this.isExtraPostageCharge();
    console.log("extraPostage: ", JSON.stringify(extraPostage));
  }

  private getMinDaysInTransit(forceEconomyShipping: boolean): number {
    const ruralDelivery =
      _.get(this.userFormData, "ruralDelivery") === "rural" ? true : false;
    if (_.get(this.userFormData, "postcode")) {
      return this.postcodeTools.getMinDaysInTransit(
        this.userFormData.postcode.toString(),
        ruralDelivery,
        forceEconomyShipping
      );
    } else {
      // Default number of days to spend in transit
      return 3;
    }
  }

  private getNumberOfNightsInRental(): number {
    if (
      this.userFormData &&
      this.userFormData.rentalDates.begin &&
      this.userFormData.rentalDates.end
    ) {
      return this.dateTools.calcNumberOfNightsFromDates(
        this.userFormData.rentalDates.begin.toDateString(),
        this.userFormData.rentalDates.end.toDateString()
      );
    } else {
      return 0;
    }
  }

  public setStartDateSummaryText() {
    const arrivalDate = moment(this.userFormData.rentalDates.begin).format("ddd, MMM D");
    this.startDateSummaryText = `Aim to arrive to you ${arrivalDate} before 5:30pm`;
  }

  public setEndDateSummaryText() {
    const returnDate = moment(this.userFormData.rentalDates.end).format("ddd, MMM D");
    this.endDateSummaryText = `To send back during ${returnDate} (extended if it arrives late)`;
  }

  public getPriceByProductId(id: number, qty: number): number {
    const pricingSchemeId = this.productTools.getPricingSchemeId(id);
    const price = this.pricingTools.getPriceByPricingIdAndNights(
      pricingSchemeId,
      this.getNumberOfNightsInRental()
    );

    return this.shouldShowGst
      ? price * qty
      : this.pricingTools.removeGst(price * qty);
  }

  public getShippingTypeForCustomer(): ShippingTypes {
    const isLocal = this.postcodeTools.isPostcodeLocal(this.userFormData.postcode);
    const isRural = this.userFormData.ruralDelivery;

    let shippingType: ShippingTypes;

    if (isLocal) {
      shippingType = isRural? ShippingTypes.LOCAL_RURAL : ShippingTypes.LOCAL;
    } else {
      if (this.isExtraPostageCharge()) {
        shippingType = isRural ? ShippingTypes.OVERNIGHT_RURAL : ShippingTypes.OVERNIGHT;
      } else {
        shippingType = isRural ? ShippingTypes.ECONOMY_RURAL : ShippingTypes.ECONOMY;
      }
    }

    return shippingType;
  }

  public getShippingPriceForOrder(): number {
    const shippingType = this.getShippingTypeForCustomer();
    if (this.allOrderLines && this.allOrderLines.length > 0) {
      return this.allOrderLines.reduce(
        (acc, orderLine) =>
          acc + this.getShippingPriceForProduct(orderLine.id, orderLine.qty, shippingType),
        0
      );
    } else {
      return 0;
    }
  }

  public getShippingPriceForProduct(id: number, qty: number, shippingType: ShippingTypes): number {
    if (this.productTools.doesRequireShipping(id)) {
      const price = this.pricingTools.getShippingPriceForType(shippingType);

      return this.shouldShowGst
        ? price * qty
        : this.pricingTools.removeGst(price * qty);
    } else {
      return 0;
    }
  }

  public getTotalPriceForOrder(): number {
    if (this.allOrderLines && this.allOrderLines.length > 0) {
      return this.allOrderLines.reduce(
        (acc, orderLine) =>
          acc + this.getPriceByProductId(orderLine.id, orderLine.qty),
        0
      );
    } else {
      return 0;
    }
  }

  public updateOrder({ id, qtyChange }) {
    const index = this.allOrderLines.findIndex(
      orderLine => orderLine.id === id
    );

    if (index >= 0) {
      const newQty = (this.allOrderLines[index].qty += qtyChange);
      if (newQty > 0) {
        this.allOrderLines[index].qty = newQty;
      } else {
        this.allOrderLines.splice(index, 1);
      }
    } else {
      this.allOrderLines.push({ id, qty: 1 });
    }

    console.log("this.allOrderLines: ", JSON.stringify(this.allOrderLines));
    this.updateOrderQty.emit({ id, qtyChange });
  }

  public submitted(form: FormGroup) {
    if (form.valid && form.dirty && form.value) {
      console.log('value: ', form.value);
      console.log('!!!!!!!!!!!!!!! VALID !!!!!!!!!!!!!!');
    }
  }

  public submittedShippingAddress(form: FormGroup) {
    if (form.valid && form.dirty && form.value) {
      this.userFormData.homeAddress = form.value;
      console.log('value: ', form.value);
      console.log('!!!!!!!!!!!!!!! VALID SHIPPING ADDRESS !!!!!!!!!!!!!!');
    }
  }

  public formChanged(form: FormGroup) {
    if (form.valid && form.dirty && form.value) {
      const name = Object.keys(form.value)[0];
      const value = Object.values(form.value)[0];
      this.userFormData[name] = value;
      console.log('this.userFormData: ', this.userFormData);

      this.setStartDateSummaryText();
      this.setEndDateSummaryText();

      //console.log('window: ', window);
      window.scrollBy({top: window.innerHeight / 4, behavior: 'smooth'});
    }
  }

  public updateDeliverToBusiness(form: FormGroup) {
    this.formChanged(form);
    this.deliverToBusiness = this.userFormData.shippingAddressType !== ShippingAddressTypes.HOME;
  }

  public showIfThisIsAnswered(formAnswer: any) {
    //const main = document.querySelector('.main');
    //main.classList.remove("foo");
    if (formAnswer || this.showAll) {
      return 'visible, animate-in'
    } else {
      return 'hidden'
    }
  }
}
