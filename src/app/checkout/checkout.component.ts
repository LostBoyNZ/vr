import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Order, OrderLine} from './orderLine.model';
import {MatCalendarCellCssClasses} from '@angular/material';
import * as _ from 'lodash';

export interface IQuestion {
  question: string;
  type: string;
  name: string;
  choices?: string[];
  maxCharacters?: number;
}

export interface IFormAnswer {
  formFieldName: string;
  value: string;
}

export interface IBookingFormDetails {
  rentalType: string;
  postcode: number;
  arrivalDate: string;
  returnDate: string;
  productChoice: string;
  name: string;
}

export interface IOrderLine {
    item: string;
    qty: string;
    startDate: string;
    endDate: string;
}

export enum FormTypes {
  SINGLE_DATE = 'single-date',
  NUMBER = 'number',
  PRODUCT_CHOICE = 'product-choice',
  RADIO = 'radio',
  TEXT = 'text',
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  @Input() order: Order;

  orderFormGroup: FormGroup;
  datesFormGroup: FormGroup;

  public formBuilder: FormBuilder = new FormBuilder();
  public orderLinesGroup: FormGroup;
  public validDates;
  public minDate = new Date();
  public calendarTip: string = null;

  public userFormData: IBookingFormDetails = {
    rentalType: null,
    postcode: null,
    arrivalDate: null,
    returnDate: null,
    productChoice: null,
    name: null,
  };

  public questions: IQuestion[] = [
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
      question: 'Which day should it arrive?',
      type: FormTypes.SINGLE_DATE,
      name: 'arrivalDate',
    },
    {
      question: 'Which day will you send it back?',
      type: FormTypes.SINGLE_DATE,
      name: 'returnDate',
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

  constructor() {
    this.createForm();
    this.validDates = (date: Date) => this.isWeekendDate(date) === false;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (this.isWeekendDate(date)) {
        return 'disabled-date';
      } else {
        return;
      }
    };
  }

  private isWeekendDate(date: Date): boolean {
    const day = date.getDay();

    return (day === 0 || day === 6);
  }

  ngOnInit() { }

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
    this.orderLinesArray.push(this.formBuilder.group(new OrderLine('', '', '', '')));
  }

  test(message: string) {
    console.log(message);
  }

  updateUserFormData(answer: IFormAnswer) {
    this.userFormData[answer.formFieldName] = answer.value;
    console.log(this.userFormData);
  }

  shouldUseRegularInputBox(formType: string) {
    const supportedInputTypes: string[] = [
      FormTypes.TEXT,
    ];
    return _.includes(supportedInputTypes, formType);
  }
}
