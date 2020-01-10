import { Injectable } from '@angular/core';
import { dynamicFormTypes } from './dynamic-field.directive';
import { IInput } from './form-components/form-input.component';

@Injectable()
export class CreateDynamicForm {
    static input(
        label: string,
        name: string,
        placeholder?: string,
        defaultValue?: string,
        validators?: Function[],
        isDisplayed = true,
        readOnly = false,
        getWarning?: Function,
        inputType?: string,
    ): IInput {
        return {
            type: dynamicFormTypes.input,
            label,
            name,
            placeholder,
            defaultValue,
            validators,
            isDisplayed,
            readOnly,
            getWarning,
            inputType,
        };
    }
}
