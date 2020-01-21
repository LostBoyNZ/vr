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
import {IFormRadioButtonOnly} from './form-components/form-radio-buttons.component';
import {IFormDateRange} from './form-components/form-date-range.component';

@Injectable()
export class CreateDynamicForm {
  static dateRange(
    label: string,
    name: string,
    minDate: Date,
    defaultBeginDate: Date,
    defaultEndDate: Date,
    validDatesFilter?: any,
    validators?: Function[],
    isDisplayed = true,
    readOnly = false,
    getWarning?: Function,
  ): IFormDateRange {
    return {
      type: dynamicFormTypes.dateRange,
      label,
      name,
      minDate,
      defaultBeginDate,
      defaultEndDate,
      validDatesFilter,
      validators,
      isDisplayed,
      readOnly,
      getWarning,
    };
  }

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
    inputType?: string,
    pattern?: string
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
      inputType,
      pattern,
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

  static radioButtons(
    label: string,
    name: string,
    defaultValue: string,
    radioButtons: Array<{ name: string; value: string }>,
    validators?: Function[],
  ): IFormRadioButtonOnly {
    return {
      type: dynamicFormTypes.radioButtons,
      label,
      name,
      defaultValue,
      radioButtons,
      validators,
    };
  }
}
