import {Component, OnInit} from '@angular/core';
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

export interface BookingFormDetails {
  rentalType: string;
  postcode: number;
  arrivalDate: string;
  name: string;
}

export enum FormTypes {
  SINGLE_DATE = 'single-date',
  NUMBER = 'number',
  RADIO = 'radio',
  TEXT = 'text',
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  public userFormData: BookingFormDetails = {
    rentalType: null,
    postcode: null,
    arrivalDate: null,
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
      question: 'When should it arrive?',
      type: FormTypes.SINGLE_DATE,
      name: 'arrivalDate',
    },
    /*
    {
      question: 'What is your name?',
      type: FormTypes.TEXT,
      name: 'name',
    }
    */
  ];

  constructor() { }

  ngOnInit() { }

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
