import {Component, OnInit} from '@angular/core';
import {FormComponentHandler} from '../formComponentHandler';

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
