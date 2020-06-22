import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormControl, FormGroup} from '@angular/forms';
import { DynamicFormConfig } from '../../forms/dynamic-form.component';

export interface DialogSimpleData {
  title: string;
  myForm: [{formControl: FormControl, label: string}];
  form: FormGroup;
  config: DynamicFormConfig;
}

@Component({
  selector: 'app-dialog-simple',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.scss']
})

export class DialogSimpleComponent {
  public form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSimpleData
  ) {
    //this.form = data.form;
  }

  ngOnInit() {
    console.log(this.data.myForm[0]);
    // TODO: This works but otherwise the formGroup is undefined when I try to addControl. But I can't set the form control name dynamically?
    // Check here for suggestions: https://stackoverflow.com/questions/55027047/angular-dynamic-formcontrolname-generate-with-fromgroup
    const controlName = this.data.myForm[0].label;
    this.form = new FormGroup({
      controlName: this.data.myForm[0].formControl
    });
    //this.form.addControl(this.data.myForm[0].label, new FormControl(this.data.myForm[0].formControl));
  }

  save() {
    console.log('form: ', this.form);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
