import { FormInputComponent } from './form-components/form-input.component';
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

export interface IDynamicForm {
    label?: string | string[]; // A label tag
    type: string; // Points to the component
    name?: string; // Name of the value to get on "form.value"
    validators?: Function[]; // Pass custom validators here
    nonPluralName?: string;
    pluralName?: string;
}

export const dynamicFormTypes = {
    input: 'input',
};

const components = {
    input: FormInputComponent,
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
