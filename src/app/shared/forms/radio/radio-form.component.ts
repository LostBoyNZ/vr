import {Component, Input, OnInit} from '@angular/core';
import {FormComponentHandler} from '../formComponentHandler';
import {IQuestion} from '../../../checkout/checkout.component';

@Component({
  selector: 'app-form-element-radio',
  templateUrl: './radio-form.component.html',
  styleUrls: ['../../../styles/forms.scss']
})

export class RadioFormComponent extends FormComponentHandler implements OnInit {
  constructor() {
    super();
  }
}
