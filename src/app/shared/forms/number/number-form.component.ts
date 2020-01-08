import { Component, Input, OnInit } from "@angular/core";
import { FormComponentHandler } from "../formComponentHandler";
import { IFormAnswer } from "../../../checkout/checkout.component";

@Component({
  selector: "app-form-element-number",
  templateUrl: "./number-form.component.html",
  styleUrls: ["../../../styles/forms.scss"]
})
export class NumberFormComponent extends FormComponentHandler
  implements OnInit {
  constructor() {
    super();
  }

  isValidAnswer(value: string): boolean {
    return (
      this.validators.isNumeric(value) &&
      this.validators.isAtLeastThisLong(
        value,
        this.question.minCharacters
      ) &&
      this.validators.isThisLongOrLess(
        value,
        this.question.maxCharacters
      )
    );
  }

  validate(value: string) {
    if (this.isValidAnswer(value)) {
      this.emitAnswer({formFieldName: this.question.name, value: this.formElement.value});
    }
  }
}
