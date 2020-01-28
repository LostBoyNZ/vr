import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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

export enum FormTypes {
  SINGLE_DATE = "single-date",
  DATE_RANGE = "date-range",
  NUMBER = "number",
  PRODUCT_CHOICE = "product-choice",
  RADIO = "radio",
  TEXT = "text"
}

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss", "../styles/forms.scss"]
})
export class CheckoutComponent implements OnInit {
  @Input() order: Order;

  @Output() updateOrderQty = new EventEmitter();

  orderFormGroup: FormGroup;
  datesFormGroup: FormGroup;

  public showAll: boolean = true;

  public orderFormRentalType: IDynamicFormConfig;
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
  public userFormData: IBookingFormDetails = {
    rentalType: null,
    postcode: null,
    ruralDelivery: null,
    rentalDates: { begin: null, end: null },
    productChoice: null,
    name: null
  };

  public testForm = new FormGroup({
    // THIS ISN'T CURRENTLY USED
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ])
  });

  constructor() {
    this.createForm();
    this.dateTools = new DateTools();
    this.pricingTools = new PricingTools();
    this.productTools = new ProductTools();
    this.postcodeTools = new PostcodeTools();
    this.shippingTimeTools = new ShippingTimeTools();
  }

  ngOnInit() {
    this.validDatesFilter = (date: Date) =>
      this.dateTools.isExcludedDate(date) === false;
    this.setMinDay();
    // this.minDate = new Date(2019, 10, 20); // month count starts at 0 for some reason

    this.maxQuestionReached = 0;
    this.questions = [
      {
        question: "What type of rental is this?",
        type: FormTypes.RADIO,
        name: "rentalType",
        choices: ["individual", "company"]
      },
      {
        question: "What is your postcode?",
        type: FormTypes.NUMBER,
        name: "postcode",
        maxCharacters: 4,
        minCharacters: 4
      },
      {
        question: "What type of postal address will you use?",
        type: FormTypes.RADIO,
        name: "ruralDelivery",
        choices: ["non rural", "rural"]
      },
      {
        question: "What dates would you like?",
        type: FormTypes.DATE_RANGE,
        name: "rentalDates",
        minDate: this.minDate,
        validDatesFilter: this.validDatesFilter,
        defaultDates: { begin: null, end: null }
      },
      {
        question: "What would you like to rent?",
        type: FormTypes.PRODUCT_CHOICE,
        name: "productChoice"
      }
      /*
      {
        question: 'What is your name?',
        type: FormTypes.TEXT,
        name: 'name',
      }
      */
    ];

    this.orderFormRentalType = {
      inputs: [
        CreateDynamicForm.radioButtons(
          "What type of rental is this?",
          "rentalType",
          'Individual',
          [
            { name: "Individual", value: "Individual" },
            { name: "Company", value: "Company" }
          ]
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

  private updateQuestionsByType(
    type: FormTypes,
    attribute: string,
    newValue: string
  ) {
    this.questions.map(question => {
      if (question.type === FormTypes.DATE_RANGE) {
        question[attribute] = newValue;
      }
    });
  }

  private updateDateRangePicker() {
    this.setMinDay();
    this.updateQuestionsByType(FormTypes.DATE_RANGE, "minDate", this.minDate);
  }

  updateUserFormData(question: IQuestion, answer: IFormAnswer) {
    this.userFormData[answer.formFieldName] = answer.value;
    console.log(this.userFormData);
    if (
      answer.formFieldName === "postcode" ||
      answer.formFieldName === "ruralDelivery"
    ) {
      this.updateDateRangePicker();
    }
    this.shouldShowGst = this.userFormData.rentalType !== "company";

    this.maxQuestionReached++;
  }

  shouldUseRegularInputBox(formType: string) {
    const supportedInputTypes: string[] = [FormTypes.TEXT];
    return _.includes(supportedInputTypes, formType);
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

  public formChanged(form: FormGroup) {
    if (form.valid && form.dirty && form.value) {
      const name = Object.keys(form.value)[0];
      const value = Object.values(form.value)[0];
      this.userFormData[name] = value;
      console.log('this.userFormData: ', this.userFormData);
    }
  }
}
