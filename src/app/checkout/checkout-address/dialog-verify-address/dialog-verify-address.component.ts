import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../../shared/forms/dynamic-form.component';

export interface DialogPopUpData {
  title: string;
  myForm: [{formControl: FormControl, label: string}];
  form: FormGroup;
  config: DynamicFormConfig;
}

@Component({
  selector: 'app-dialog-verify-address',
  templateUrl: './dialog-verify-address.component.html',
  styleUrls: ['./dialog-verify-address.component.scss']
})

export class DialogVerifyAddressComponent {
  public form: FormGroup;

  public formArray = [
    {
      "key" : "email2",
      "default" : "",
      validators: [Validators.required, Validators.email],
    },
    {
      "key": "email",
      "default": "",
      validators: [Validators.required, Validators.email],
    }
  ];

  constructor(
    private dialogRef: MatDialogRef<DialogVerifyAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPopUpData
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    for(let formModule of this.formArray){
      this.form.addControl(formModule.key,
        new FormControl(formModule.default, formModule.validators))
    }
  }

  save() {
    console.log('form: ', this.form);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
