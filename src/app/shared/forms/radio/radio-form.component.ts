import {Component, OnInit} from '@angular/core';
import {FormComponentHandler} from '../formComponentHandler';

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
