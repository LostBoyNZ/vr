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
        FormWarningMessageComponent,
    ],
    exports: [
        DynamicFormComponent,
        FormInputComponent,
        FormErrorMessageComponent,
        FormWarningMessageComponent,
    ],
    entryComponents: [
        FormInputComponent,
        FormErrorMessageComponent,
        FormWarningMessageComponent,
    ],
    providers: [CustomFormValidators, CreateDynamicForm],
})
export class DynamicFormModule {}
