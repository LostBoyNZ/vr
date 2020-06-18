import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogSimpleComponent} from './dialog-simple.component';
import {map, take} from 'rxjs/operators';

@Injectable()
export class DialogSimpleConfirmService {
  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<DialogSimpleComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(DialogSimpleComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}
