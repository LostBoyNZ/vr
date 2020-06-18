import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup } from "@angular/forms";
import { DynamicFormConfig } from '../../forms/dynamic-form.component';

export interface DialogSimpleData {
  title: string;
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
  public dynamicFormConfig: DynamicFormConfig;

  constructor(
    private dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSimpleData) {
    this.form = data.form;
    this.dynamicFormConfig = data.config;
  }

  save() {
    console.log('form: ', this.form);
    console.log('dynamicFormConfig: ', this.dynamicFormConfig);
    this.dialogRef.close(this.form.value);
  }

  submitted(event) {
    console.log('submitted with: ', event);
  }

  close() {
    this.dialogRef.close();
  }

}
