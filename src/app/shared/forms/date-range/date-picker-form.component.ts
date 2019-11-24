import {Component, OnInit} from '@angular/core';
import {FormComponentHandler} from '../formComponentHandler';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-element-date-picker',
  templateUrl: './date-picker-form.component.html',
  styleUrls: ['../../../styles/forms.scss']
})

export class DatePickerFormComponent extends FormComponentHandler implements OnInit {
  public formBuilder: FormBuilder = new FormBuilder();
  datesFormGroup: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    const defaultBeginDate = (_.get(this.question, 'defaultDates')) ? this.question.defaultDates.begin : null;
    const defaultEndDate = (_.get(this.question, 'defaultDates')) ? this.question.defaultDates.end : null;
    this.datesFormGroup = this.formBuilder.group({
      date: [{begin: defaultBeginDate, end: defaultEndDate}]
    });
  }

  saveDates(event: any) {
    const dateChoice = {
      begin: event.target.value.begin,
      end: event.target.value.end,
    };

    this.emitAnswer({formFieldName: this.question.name, value: dateChoice});
  }
}
