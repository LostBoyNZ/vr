import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {Order, OrderLine} from './orderLine.model';
import {DateTools} from '../shared/tools/dateTools';
import * as _ from 'lodash';
import {PostcodeTools} from '../shared/tools/postcodeTools';
import {ShippingTimeTools} from '../shared/tools/shippingTimeTools';

export interface IQuestion {
  question: string;
  type: string;
  name: string;
  choices?: string[];
  maxCharacters?: number;
  minDate?: Date;
  validDatesFilter?: any;
  defaultDates?: { begin: Date, end: Date };
}

export interface IFormAnswer {
  formFieldName: string;
  value: any;
}

export interface IBookingFormDetails {
  rentalType: string;
  postcode: number;
  ruralDelivery: string;
  rentalDates: { begin: Date, end: Date };
  productChoice: string;
  name: string;
}

export interface IOrderLine {
    item: string;
    qty: string;
}

export enum FormTypes {
  SINGLE_DATE = 'single-date',
  DATE_RANGE = 'date-range',
  NUMBER = 'number',
  PRODUCT_CHOICE = 'product-choice',
  RADIO = 'radio',
  TEXT = 'text',
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit {
  @Input() order: Order;

  orderFormGroup: FormGroup;
  datesFormGroup: FormGroup;

  public questions: IQuestion[];
  public formBuilder: FormBuilder = new FormBuilder();
  public orderLinesGroup: FormGroup;
  public postcodeTools: PostcodeTools;
  public shippingTimeTools: ShippingTimeTools;
  public dateTools: DateTools;
  public validDatesFilter;
  public minDate;
  public calendarTip: string = null;
  public userFormData: IBookingFormDetails = {
    rentalType: null,
    postcode: null,
    ruralDelivery: null,
    rentalDates: { begin: null, end: null },
    productChoice: null,
    name: null,
  };

  constructor() {
    this.createForm();
    this.dateTools = new DateTools();
    this.postcodeTools = new PostcodeTools();
    this.shippingTimeTools = new ShippingTimeTools();
  }

  ngOnInit() {
    this.validDatesFilter = (date: Date) => this.dateTools.isExcludedDate(date) === false;
    this.setMinDay();
    // this.minDate = new Date(2019, 10, 20); // month count starts at 0 for some reason

    this.questions = [
      {
        question: 'What type of rental is this?',
        type: FormTypes.RADIO,
        name: 'rentalType',
        choices: ['individual', 'company'],
      },
      {
        question: 'What is your postcode?',
        type: FormTypes.NUMBER,
        name: 'postcode',
        maxCharacters: 4,
      },
      {
        question: 'What type of postal address will you use?',
        type: FormTypes.RADIO,
        name: 'ruralDelivery',
        choices: ['non rural', 'rural'],
      },
      {
        question: 'What dates would you like?',
        type: FormTypes.DATE_RANGE,
        name: 'rentalDates',
        minDate: this.minDate,
        validDatesFilter: this.validDatesFilter,
        defaultDates: {begin: null, end: null},
      },
      {
        question: 'What would you like to rent?',
        type: FormTypes.PRODUCT_CHOICE,
        name: 'productChoice',
      },
      /*
      {
        question: 'What is your name?',
        type: FormTypes.TEXT,
        name: 'name',
      }
      */
    ];
  }

  createForm() {
    this.orderFormGroup = this.formBuilder.group({
      orderLinesArray: this.formBuilder.array([])
    });
    this.datesFormGroup = this.formBuilder.group({
      date: [{begin: '', end: ''}]
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.setOrderLines(this.order.orderLines);
  }

  get orderLinesArray(): FormArray {
    return this.orderFormGroup.get('orderLinesArray') as FormArray;
  }

  setOrderLines(orderLines: OrderLine[]) {
    const orderLinesFA = this.formBuilder.group(orderLines);

    this.orderFormGroup.setControl('orderLinesArray', orderLinesFA);
  }

  addOrderLine() {
    // const defaultBeginDate: Date = (this.userFormData.rentalDates.begin) ?  this.userFormData.rentalDates.begin : null;
    // const defaultEndDate: Date = (this.userFormData.rentalDates.end) ?  this.userFormData.rentalDates.end : null;
    this.orderLinesArray.push(
      this.formBuilder.group(
        new OrderLine('', '')
      )
    );
  }

  private updateQuestionsByType(type: FormTypes, attribute: string, newValue: string) {
    this.questions.map (question => {
      if (question.type === FormTypes.DATE_RANGE) {
        question[attribute] = newValue;
      }
    });
  }

  private updateDateRangePicker() {
    this.setMinDay();
    this.updateQuestionsByType(FormTypes.DATE_RANGE, 'minDate', this.minDate);
  }

  updateUserFormData(answer: IFormAnswer) {
    this.userFormData[answer.formFieldName] = answer.value;
    console.log(this.userFormData);
    if (answer.formFieldName === 'postcode' || answer.formFieldName === 'ruralDelivery') {
      this.updateDateRangePicker();
    }
  }

  shouldUseRegularInputBox(formType: string) {
    const supportedInputTypes: string[] = [
      FormTypes.TEXT,
    ];
    return _.includes(supportedInputTypes, formType);
  }

  public isExtraPostageCharge(): boolean {
    const today = new Date();
    const ruralDelivery = _.get(this.userFormData, 'ruralDelivery') === 'rural' ? true : false;
    const minDaysInTransit: number = (ruralDelivery) ? 4 : 3;

    const earliestRentalDateForEconomyShipping: Date = this.dateTools.getEarliestRentalDateFromDate(
      today, minDaysInTransit
    );

    return this.dateTools.isDateSameOrAfter(earliestRentalDateForEconomyShipping, this.userFormData.rentalDates.begin);
  }

  public setMinDay() {
    const minDaysInTransit = this.getMinDaysInTransit();
    const today = new Date();
    const minDate = this.dateTools.getEarliestRentalDateFromDate(today, minDaysInTransit);
    this.minDate = this.dateTools.formatDateDisplay(minDate, 'YYYY-MM-DD');
    const extraPostage = this.isExtraPostageCharge();
    console.log('extraPostage: ', JSON.stringify(extraPostage));
  }

  private getMinDaysInTransit() {
    const ruralDelivery = _.get(this.userFormData, 'ruralDelivery') === 'rural' ? true : false;

    if (_.get(this.userFormData, 'postcode')) {
      return this.postcodeTools.getMinDaysInTransit(this.userFormData.postcode, ruralDelivery);
    } else {
      // Default number of days to spend in transit
      return 3;
    }
  }
}
