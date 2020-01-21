import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IDynamicForm} from '../dynamic-field.directive';

@Component({
  selector: 'app-form-date-range',
  templateUrl: './form-date-range.component.html',
  styleUrls: ['../../../styles/forms.scss']
})

export class FormDateRangeComponent {
  @Input()
  config: IFormDateRange;
  @Input()
  group: FormGroup;

  public isReadOnly: boolean = false;

  ngOnInit() {
    this.isReadOnly = this.config && this.config.readOnly;
  }

  get input() {
    return this.group.get(this.config.name);
  }

  get warningMessage() {
    return this.config.getWarning && this.config.getWarning(this.group);
  }
}

export interface IFormDateRange extends IDynamicForm {
  isDisplayed: boolean;
  minDate?: Date,
  defaultBeginDate?: Date;
  defaultEndDate?: Date;
  validDatesFilter?: any;
  readOnly?: boolean;
  getWarning?: Function;
}
