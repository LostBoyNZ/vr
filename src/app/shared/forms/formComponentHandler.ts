import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFormAnswer, IQuestion} from '../../checkout/checkout.component';
import {FormControl, Validators} from '@angular/forms';

export class FormComponentHandler implements OnInit {
  @Input() question: IQuestion;

  @Output() answer: EventEmitter<IFormAnswer> = new EventEmitter();

  formElement = new FormControl('');

  constructor() { }

  ngOnInit() { }

  emitAnswer(answer: IFormAnswer) {
    this.answer.emit(answer);
  }
}
