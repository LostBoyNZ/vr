import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "app-input-email",
  templateUrl: "./input-email.component.html",
  styleUrls: ["./input-email.component.scss"]
})

export class InputEmailComponent {
  @Input()
  parentForm: FormGroup;

  @Input()
  myControl: FormControl;

  @Input()
  heading: String;

  public key;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InputEmailComponent) {
  }

  ngOnInit() {
    this.key = Object.keys(this.parentForm.value)[0];
    console.log('parentForm: ', this.parentForm);
    console.log('myControl: ', this.myControl);
  }
}
