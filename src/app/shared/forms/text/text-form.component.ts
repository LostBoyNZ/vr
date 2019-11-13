import {Component, OnInit} from '@angular/core';
import {FormComponentHandler} from '../formComponentHandler';

@Component({
  selector: 'app-form-element-text',
  templateUrl: './text-form.component.html',
  styleUrls: ['../../../styles/forms.scss']
})

export class TextFormComponent extends FormComponentHandler implements OnInit {
  constructor() {
    super();
  }
}
