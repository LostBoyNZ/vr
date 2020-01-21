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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        FormInputComponent,
        FormInputNumberComponent,
        FormErrorMessageComponent,
        FormSelectComponent,
        FormRadioButtonsComponent,
        FormWarningMessageComponent,
        FormMultiSelectComponent,
        FormRadioToggleComponent,
    ],
    exports: [
        DynamicFormComponent,
        FormInputComponent,
        FormInputNumberComponent,
        FormErrorMessageComponent,
        FormSelectComponent,
        FormRadioButtonsComponent,
        FormWarningMessageComponent,
        FormMultiSelectComponent,
        FormRadioToggleComponent,
    ],
    entryComponents: [
        FormInputComponent,
        FormInputNumberComponent,
        FormErrorMessageComponent,
        FormSelectComponent,
        FormRadioButtonsComponent,
        FormWarningMessageComponent,
        FormMultiSelectComponent,
        FormRadioToggleComponent,
    ],
    providers: [CustomFormValidators, CreateDynamicForm],
})
export class DynamicFormModule {}
