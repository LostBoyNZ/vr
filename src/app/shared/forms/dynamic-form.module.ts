import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { CreateDynamicForm } from './create-dynamic-form';
import { FormInputComponent } from './form-components/form-input.component';
import { CustomFormValidators } from './custom-form.validators';
import {DynamicFormComponent} from './dynamic-form.component';

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
    ],
    exports: [
        DynamicFormComponent,
        FormInputComponent,
    ],
    entryComponents: [
        FormInputComponent,
    ],
    providers: [CustomFormValidators, CreateDynamicForm],
})
export class DynamicFormModule {}
