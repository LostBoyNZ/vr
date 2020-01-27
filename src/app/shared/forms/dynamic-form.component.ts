import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isNil } from 'lodash';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ["./dynamic-form.component.scss"]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
    @Input()
    config: DynamicFormConfig;
    @Input()
    title: string;
    @Input()
    close: (text: string) => void;
    @Input()
    textCapitalize: boolean;

    @Output()
    submitted: EventEmitter<ICustomFormControl> = new EventEmitter<ICustomFormControl>();
    @Output()
    currentValue: EventEmitter<any> = new EventEmitter();
    @Output()
    extraFunction = new EventEmitter();

    form: FormGroup;

    private subscription: Subscription;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.createGroup();
        this.subscription = this.form.valueChanges.subscribe(() =>
          this.currentValue.emit(this.form)
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    createGroup() {
        const group = this.fb.group(
            {},
            { validator: this.globalValidatorAssigner(this.config.validators) },
        );
        this.config.inputs.forEach(config => {
            const { name, validators, hidden, defaultValue, isArray } = config;

            if (!name) {
                return;
            }

            const formAdd = isArray
                ? this.fb.array(
                      this.defaultValueAssigner(defaultValue, true),
                      validators || [],
                  )
                : this.fb.control(this.defaultValueAssigner(defaultValue), validators || []);
            group.addControl(name, formAdd);

            if (hidden) {
                group.controls[name].disable();
            }
        });
        return group;
    }

    public onSubmit(form: ICustomFormControl) {
        form.submitted = true;
        const { onSubmit } = this.config;
        if (onSubmit) {
            onSubmit(form);
        }

        this.submitted.emit(form);
    }

    private defaultValueAssigner(defaultValue: any, isArray?: boolean): any {
        if (!isNil(defaultValue)) {
            return defaultValue;
        } else {
            if (isArray) {
                return [];
            }
            return null;
        }
    }

    private globalValidatorAssigner(validators: any[]): any[] | null {
        return validators ? [...validators] : null;
    }
}

export interface DynamicFormInput {
    type: string;
    label?: string | string[];
    name?: string;
    data?: any;
    defaultValue?: any;
    isArray?: boolean;
    defaultValueArrayObject?: object[];
    nameDate?: string;
    nameTime?: string;

    [key: string]: any;
}

export interface DynamicFormConfig {
    inputs: DynamicFormInput[];
    validators?: any[];
    onSubmit?: (formControl: ICustomFormControl) => any;
    title?: string;
}

interface ICustomFormControl extends FormControl {
    submitted: boolean;
}
