import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { CreateDynamicForm } from './create-dynamic-form';
import { FormInputComponent } from './form-components/form-input.component';
import { CustomFormValidators } from './custom-form.validators';
import {DynamicFormComponent} from './dynamic-form.component';
import {FormWarningMessageComponent} from './form-components/form-warning-message.component';
import {FormErrorMessageComponent} from './form-components/form-error-message.component';
import {FormSelectComponent} from './form-components/form-select.component';

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
        FormErrorMessageComponent,
        FormSelectComponent,
        FormWarningMessageComponent,
    ],
    exports: [
        DynamicFormComponent,
        FormInputComponent,
        FormErrorMessageComponent,
        FormSelectComponent,
        FormWarningMessageComponent,
    ],
    entryComponents: [
        FormInputComponent,
        FormErrorMessageComponent,
        FormSelectComponent,
        FormWarningMessageComponent,
    ],
    providers: [CustomFormValidators, CreateDynamicForm],
})
export class DynamicFormModule {}
