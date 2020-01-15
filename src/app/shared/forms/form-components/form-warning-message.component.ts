import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'form-warning-message',
    templateUrl: "./form-warning-message.component.html",
})
export class FormWarningMessageComponent {
    @Input()
    message: string;
    @Input()
    name: string;
}
