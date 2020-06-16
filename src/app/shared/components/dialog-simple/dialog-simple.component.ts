import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-simple',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.scss']
})

export class DialogSimpleComponent implements OnInit {
  public form: FormGroup;
  public description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) {description,longDescription,
      category}:Course ) {

    this.description = description;


    this.form = fb.group({
      description: [description, Validators.required],
      category: [category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [longDescription,Validators.required]
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
