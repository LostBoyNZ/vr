import {Component, Inject, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogSimpleData} from '../../components/dialog-simple/dialog-simple.component';

@Component({
  selector: "app-child-input",
  templateUrl: "./child-input.component.html",
  styleUrls: ["./child-input.component.scss"]
})

export class ChildInputComponent {
  @Input()
  label: string;

  @Input()
  parentForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChildInputComponent) {
  }

  ngOnInit() {
    // Code to give this input box a material design input box design
    const setActive = (el, active) => {
      const formField = el.parentNode.parentNode
      if (active) {
        formField.classList.add('form-field--is-active')
      } else {
        formField.classList.remove('form-field--is-active')
        el.value === '' ?
          formField.classList.remove('form-field--is-filled') :
          formField.classList.add('form-field--is-filled')
      }
    }

    [].forEach.call(
      document.querySelectorAll('.form-field__input, .form-field__textarea'),
      (el) => {
        el.onblur = () => {
          setActive(el, false)
        }
        el.onfocus = () => {
          setActive(el, true)
        }
      }
    )
  }
}
