import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'form-error-message',
    templateUrl: './form-error-message.component.html',
})
export class FormErrorMessageComponent {
    @Input()
    input: FormControl;
    @Input()
    name: string;

    public getParams() {
        const params = this.input.errors ? this.input.errors.params : {};

        return {
            ...{ name: this.name },
            ...params,
        };
    }
}
