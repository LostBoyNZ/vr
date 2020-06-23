import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-verify-address',
  templateUrl: './dialog-verify-address.component.html',
  styleUrls: ['./dialog-verify-address.component.scss']
})

export class DialogVerifyAddressComponent {
  public form: FormGroup;
  public value: string;

  constructor(
    private dialogRef: MatDialogRef<DialogVerifyAddressComponent>
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
