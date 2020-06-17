import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';

export interface DialogSimpleData {
  title: string;
  address: string;
}

@Component({
  selector: 'app-dialog-simple',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.scss']
})

export class DialogSimpleComponent implements OnInit {
  public form: FormGroup;
  public address: string;

  // constructor(
  //   public dialogRef: MatDialogRef<DialogSimpleComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogSimpleData) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSimpleData ) {

    this.address = data.address;

    this.form = fb.group({
      address: [data.address, Validators.required],
    });

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

export interface Course {
  id:number;
  description:string;
  iconUrl: string;
  courseListIcon: string;
  longDescription: string;
  category:string;
  lessonsCount:number;
}
