import { Component, Inject, Pipe, PipeTransform } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSimpleData
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    for(let formModule of this.formArray){
      this.form.addControl(formModule.key,
        new FormControl(formModule.default, formModule.validators))
    }
    console.log('!!!!!!!!!!!!! this.form: ', this.form);
  }

  save() {
    console.log('form: ', this.form);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
