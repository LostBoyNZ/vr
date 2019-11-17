import {Component, OnInit} from '@angular/core';
import {FormComponentHandler} from '../formComponentHandler';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {SatDatepickerInputEvent} from 'saturn-datepicker';

@Component({
  selector: 'app-form-element-date-picker',
  templateUrl: './date-picker-form.component.html',
  styleUrls: ['../../../styles/forms.scss']
})

export class DatePickerFormComponent extends FormComponentHandler implements OnInit {
  public formBuilder: FormBuilder = new FormBuilder();
  datesFormGroup: FormGroup;
  events: string[] = [];

  constructor() {
    super();
    this.datesFormGroup = this.formBuilder.group({
      date: [{begin: '', end: ''}]
    });
  }

  public async addEvent(type: string, event: SatDatepickerInputEvent<Date>) {
    await this.events.push(`${type}: ${event.value}`);
    console.log('events:', this.events);
  }
}
