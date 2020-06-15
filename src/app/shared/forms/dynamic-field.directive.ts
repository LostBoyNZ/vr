import {
    ComponentFactoryResolver,
    Directive,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputComponent } from './form-components/form-input.component';
import { FormInputNumberComponent } from './form-components/form-input-number.component';
import { FormSelectComponent } from './form-components/form-select.component';
import { FormMultiSelectComponent } from './form-components/form-multi-select.component';
import { FormRadioToggleComponent } from './form-components/form-radio-toggle.component';
import { FormRadioButtonsComponent } from './form-components/form-radio-buttons.component';
import {FormDateRangeComponent} from './form-components/form-date-range.component';
import {FormAddressAutoCompleteComponent} from './form-components/form-address-auto-complete.component';
import {FormFooterButtonsComponent} from './form-components/form-footer-buttons.component';

export interface IDynamicForm {
    label?: string | string[]; // A label tag
    type: string; // Points to the component
    name?: string; // Name of the value to get on "form.value"
    validators?: Function[]; // Pass custom validators here
    nonPluralName?: string;
    pluralName?: string;
}

export const dynamicFormTypes = {
    dateRange: 'dateRange',
    input: 'input',
    inputNumber: 'inputNumber',
    select: 'select',
    multiSelect: 'multiSelect',
    radioToggle: 'radiotoggle',
    radioButtons: 'radioButtons',
    addressAutoComplete: 'addressAutoComplete',
    footerButtons: 'footerButtons',
};

const components = {
    dateRange: FormDateRangeComponent,
    input: FormInputComponent,
    inputNumber: FormInputNumberComponent,
    select: FormSelectComponent,
    multiSelect: FormMultiSelectComponent,
    radiotoggle: FormRadioToggleComponent,
    radioButtons: FormRadioButtonsComponent,
    addressAutoComplete: FormAddressAutoCompleteComponent,
    footerButtons: FormFooterButtonsComponent,
};

@Directive({
    selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit {
    @Input()
    config;
    @Input()
    group: FormGroup;
    @Input()
    close: (text: string) => void;
    @Output()
    extraFunction = new EventEmitter();

    component;
    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
    ) {}

    ngOnInit() {
        const component = components[this.config.type];
        const factory = this.resolver.resolveComponentFactory<any>(component);
        this.component = this.container.createComponent(factory);
        this.component.instance.config = this.config;
        this.component.instance.close = this.close;
        this.component.instance.group = this.group;
        this.component.instance.extraFunction = this.extraFunction;
    }
}
