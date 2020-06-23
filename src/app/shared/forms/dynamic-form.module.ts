import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form.component';
import { CreateDynamicForm } from './create-dynamic-form';
import { CustomFormValidators } from './custom-form.validators';
import { FormInputComponent } from './form-components/form-input.component';
import { FormInputNumberComponent } from './form-components/form-input-number.component';
import { FormWarningMessageComponent } from './form-components/form-warning-message.component';
import { FormErrorMessageComponent } from './form-components/form-error-message.component';
import { FormSelectComponent } from './form-components/form-select.component';
import { FormMultiSelectComponent } from './form-components/form-multi-select.component';
import { FormRadioToggleComponent } from './form-components/form-radio-toggle.component';
import { FormRadioButtonsComponent } from './form-components/form-radio-buttons.component';
import {FormDateRangeComponent} from './form-components/form-date-range.component';
import {MAT_DATE_LOCALE, SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormAddressAutoCompleteComponent} from './form-components/form-address-auto-complete.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormButtonComponent} from './form-components/form-button.component';
import {FormFooterButtonsComponent} from './form-components/form-footer-buttons.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {InputEmailComponent} from './form-components/input-email.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        FormDateRangeComponent,
        FormInputComponent,
        FormInputNumberComponent,
        FormErrorMessageComponent,
        FormSelectComponent,
        FormRadioButtonsComponent,
        FormWarningMessageComponent,
        FormMultiSelectComponent,
        FormRadioToggleComponent,
        FormAddressAutoCompleteComponent,
        FormButtonComponent,
        FormFooterButtonsComponent,
        InputEmailComponent,
    ],
  exports: [
    DynamicFormComponent,
    FormDateRangeComponent,
    FormInputComponent,
    FormInputNumberComponent,
    FormErrorMessageComponent,
    FormSelectComponent,
    FormRadioButtonsComponent,
    FormWarningMessageComponent,
    FormMultiSelectComponent,
    FormRadioToggleComponent,
    FormAddressAutoCompleteComponent,
    InputEmailComponent,
  ],
    entryComponents: [
        FormDateRangeComponent,
        FormInputComponent,
        FormInputNumberComponent,
        FormErrorMessageComponent,
        FormSelectComponent,
        FormRadioButtonsComponent,
        FormWarningMessageComponent,
        FormMultiSelectComponent,
        FormRadioToggleComponent,
        FormAddressAutoCompleteComponent,
        FormButtonComponent,
        FormFooterButtonsComponent,
        InputEmailComponent,
    ],
    providers: [CustomFormValidators, CreateDynamicForm, {provide: MAT_DATE_LOCALE, useValue: 'en-NZ' }],
})
export class DynamicFormModule {}
