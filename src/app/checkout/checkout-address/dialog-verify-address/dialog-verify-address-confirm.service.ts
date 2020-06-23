import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {map, take} from 'rxjs/operators';
import {DialogVerifyAddressComponent} from './dialog-verify-address.component';

@Injectable()
export class DialogVerifyAddressConfirmService {
  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<DialogVerifyAddressComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(DialogVerifyAddressComponent, {
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
