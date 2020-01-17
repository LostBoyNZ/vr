import { Injectable } from '@angular/core';
import { dynamicFormTypes } from './dynamic-field.directive';
import { IInput } from './form-components/form-input.component';
import {ISelect, ISelectData} from './form-components/form-select.component';

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

  static select(
    label: string,
    name: string,
    data: ISelectData[],
    defaultValue?: string,
    validators?: Function[],
    selectLabelAlign = 'right',
    listMaxHeight?: number,
    alwaysExpanded?: boolean,
    placeholder?: string,
  ): ISelect {
    return {
      type: dynamicFormTypes.select,
      label,
      name,
      data,
      defaultValue,
      validators,
      selectLabelAlign,
      listMaxHeight,
      alwaysExpanded,
      placeholder,
    };
  }
}
