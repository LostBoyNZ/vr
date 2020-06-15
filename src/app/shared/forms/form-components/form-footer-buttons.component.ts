import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicForm } from '../dynamic-field.directive';

@Component({
    selector: 'form-footer-buttons',
    templateUrl: './form-footer-buttons.component.html',
})
export class FormFooterButtonsComponent {
    public config: IFooterButtons;
    public group: FormGroup;
    public close: (text: string) => void;

    constructor() {}

    public cancel() {
        this.close('close');
    }

    async onClick(button: IFooterButton) {
        if (button.type === 'cancel' || button.type === 'close') {
            this.cancel();
        } else if (this.group.valid || button.type === 'default' || button.type === 'back') {
            await button.callbackFn(this.group);
            if (button.closeAfterCallback !== false) {
                this.close(button.type);
            }
        }
    }

    public buttonStyle(type: string) {
        switch (type) {
            case 'submit':
                return 'save';
            case 'delete':
                return 'delete';
            case 'back':
            case 'cancel':
            case 'close':
            default:
                return 'cancel';
        }
    }
}

export interface IFooterButtons extends IDynamicForm {
    buttons: IFooterButton[];
    customErrorMessage?: (form: FormGroup) => string;
}

export interface IFooterButton {
    label: string;
    type: 'submit' | 'cancel' | 'close' | 'default' | 'back' | 'delete';
    callbackFn: (form: FormGroup) => Promise<any> | any;
    closeAfterCallback?: boolean;
    isRefreshing?: (form: FormGroup) => boolean;
    isButtonDisabled?: (form: FormGroup) => boolean;
}
