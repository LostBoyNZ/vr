import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicForm } from '../dynamic-field.directive';

@Component({
    selector: 'form-radio-toggle',
    templateUrl: './form-radio-toggle.component.html',
    styles: [
        `
            .btn-default.btn.active {
                background-color: #2a2b3d;
            }
        `,
    ],
})
export class FormRadioToggleComponent {
    public config: IRadioToggle;
    public group: FormGroup;
}

export interface IRadioToggle extends IDynamicForm {
    radioName: IRadioToggleName;
    defaultValue?: boolean;
    isDisplayed: boolean;
}

export interface IRadioToggleName {
    false: string;
    true: string;
}
