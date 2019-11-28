import {Component, Input, OnInit} from '@angular/core';
import {FormComponentHandler} from '../formComponentHandler';
import {IQuestion} from '../../../checkout/checkout.component';

@Component({
  selector: 'app-form-element-single-date',
  templateUrl: './single-date-form.component.html',
  styleUrls: ['../../../styles/forms.scss']
})

export class SingleDateFormComponent extends FormComponentHandler implements OnInit {
  constructor() {
    super();
  }
}
