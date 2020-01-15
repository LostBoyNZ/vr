import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicForm } from '../dynamic-field.directive';

@Component({
  selector: "app-form-input",
  templateUrl: "./form-input.component.html",
})
export class FormInputComponent {
    @Input()
    config: IInput;
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

    get inputType() {
        return this.config.inputType ? this.config.inputType : 'text';
    }
}

export interface IInput extends IDynamicForm {
    defaultValue?: string;
    placeholder?: string;
    isDisplayed: boolean;
    readOnly?: boolean;
    getWarning?: Function;
    inputType?: string;
}
