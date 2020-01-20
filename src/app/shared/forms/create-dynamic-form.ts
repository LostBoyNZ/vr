import { Injectable } from "@angular/core";
import { dynamicFormTypes } from "./dynamic-field.directive";
import { IInput } from "./form-components/form-input.component";
import { IInputNumber } from "./form-components/form-input-number.component";
import { ISelect, ISelectData } from "./form-components/form-select.component";
import {
  IMultiSelect,
  IMultiSelectData
} from "./form-components/form-multi-select.component";
import {
  IRadioToggle,
  IRadioToggleName
} from "./form-components/form-radio-toggle.component";

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
    inputType?: string
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
      inputType
    };
  }

  static inputNumber(
    label: string,
    name: string,
    placeholder?: string,
    defaultValue?: string,
    validators?: Function[],
    isDisplayed = true,
    readOnly = false,
    getWarning?: Function,
    inputType?: string
  ): IInputNumber {
    return {
      type: dynamicFormTypes.inputNumber,
      label,
      name,
      placeholder,
      defaultValue,
      validators,
      isDisplayed,
      readOnly,
      getWarning,
      inputType
    };
  }

  static select(
    label: string,
    name: string,
    data: ISelectData[],
    defaultValue?: string,
    validators?: Function[],
    selectLabelAlign = "right",
    listMaxHeight?: number,
    alwaysExpanded?: boolean,
    placeholder?: string
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
      placeholder
    };
  }

  static multiSelect(
    label: string,
    name: string,
    data: IMultiSelectData[],
    validators?: Function[],
    placeholder?: string,
    selectLabelAlign = "right",
    listMaxHeight?: number
  ): IMultiSelect {
    return {
      type: dynamicFormTypes.multiSelect,
      label,
      name,
      data,
      validators,
      placeholder,
      selectLabelAlign,
      listMaxHeight
    };
  }

  static radioToggle(
    label: string,
    name: string,
    radioName: IRadioToggleName,
    defaultValue?: boolean,
    validators?: Function[],
    isDisplayed = true
  ): IRadioToggle {
    return {
      type: dynamicFormTypes.radioToggle,
      label,
      name,
      radioName,
      defaultValue,
      validators,
      isDisplayed
    };
  }
}
