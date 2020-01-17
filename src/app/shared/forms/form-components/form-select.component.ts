import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicForm } from '../dynamic-field.directive';

@Component({
    selector: 'form-select',
    templateUrl: './form-select.component.html',
})
export class FormSelectComponent implements OnInit {
    @Input()
    config: ISelect;
    @Input()
    group: FormGroup;
    @Input()
    label: string;

    public model: string;
    public expanded: boolean;

    ngOnInit(): void {
        if (this.config.defaultValue) {
            const value = this.config.data.find(x => x.name === this.config.defaultValue);
            this.itemSelected(value);
        }
        this.expanded = this.config.alwaysExpanded;
    }

    itemSelected(item: { name: string; value: string }) {
        this.model = item.value;
    }

    public ngClassConfig(itemValue: string): string {
        return this.model === itemValue ? 'selected' : '';
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

    public toggleExpanded() {
        if (this.config.alwaysExpanded) {
            return;
        }
        this.expanded = !this.expanded;
    }
}

export interface ISelect extends IDynamicForm {
    data: ISelectData[];
    defaultValue?: string;
    selectLabelAlign?: string;
    errorMessage?: string;
    listMaxHeight?: number;
    alwaysExpanded?: boolean;
    placeholder: string;
}

export interface ISelectData {
    name: string;
    value: string;
}
