import { Component } from '@angular/core';
import { IDynamicForm } from '../dynamic-field.directive';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-radio-buttons',
    templateUrl: './form-radio-buttons.component.html',
    styleUrls: ['./form-radio-buttons.component.scss'],
})
export class FormRadioButtonsComponent {
    public config: IFormRadioButtonOnly;
    public group: FormGroup;
}

export interface IFormRadioButtonOnly extends IDynamicForm {
    radioButtons: Array<{ name: string; value: string }>;
    defaultValue: string;
    label?: string;
}
