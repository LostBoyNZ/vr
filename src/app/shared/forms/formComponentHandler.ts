import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFormAnswer, IQuestion} from '../../checkout/checkout.component';
import {FormControl} from '@angular/forms';
import {Validators} from './validators';

export interface IDynamicFormInput {
  type: string;
  label?: string | string[];
  name?: string;
  defaultValue?: any;
}

export interface IDynamicFormConfig {
  inputs: IDynamicFormInput[];
  validators?: any[];
  onSubmit?: (formControl: ICustomFormControl) => any;
  title?: string;
}

interface ICustomFormControl extends FormControl {
  submitted: boolean;
}

export class FormComponentHandler implements OnInit {
  @Input() question: IQuestion;

  @Output() answer: EventEmitter<IFormAnswer> = new EventEmitter();

  formElement = new FormControl('');

  public validators: Validators;

  constructor() {
    this.validators = new Validators();
  }

  ngOnInit() { }

  validate(value: any) { }

  isValidAnswer(value: any) { }

  emitAnswer(answer: IFormAnswer) {
    this.answer.emit(answer);
  }
}
