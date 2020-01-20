import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicForm } from '../dynamic-field.directive';
import { includes, pull } from 'lodash';

@Component({
    selector: 'form-multi-select',
    templateUrl: './form-multi-select.component.html',
})
export class FormMultiSelectComponent {
    @Input()
    config: IMultiSelect;
    @Input()
    group: FormGroup;
    @Input()
    label: string;

    value: string;
    public model: Array<string>;

    constructor() {
        this.value = '';
        this.model = [];
    }

    itemSelected(item: { name: string; value: string }) {
        if (includes(this.model, item.value)) {
            pull(this.model, item.value);
        } else {
            this.model.push(item.value);
        }
        this.value = this.model.join(', ');
        this.group.controls[this.config.name].patchValue(this.model);
    }

    public getSelectValueStyle(align = 'right') {
        return { 'text-align': align };
    }

    public getSelectListStyle(maxHeight: number) {
        if (maxHeight) {
            return {
                'max-height': `${maxHeight}px`,
                overflow: 'auto',
            };
        }
    }

    isSelected(item) {
        return includes(this.model, item);
    }

    get input() {
        return this.group.get(this.config.name);
    }
}

export interface IMultiSelect extends IDynamicForm {
    data: IMultiSelectData[];
    selectLabelAlign?: string;
    errorMessage?: string;
    listMaxHeight?: number;
    placeholder?: string;
}

export interface IMultiSelectData {
    name: string;
    value: string;
}
