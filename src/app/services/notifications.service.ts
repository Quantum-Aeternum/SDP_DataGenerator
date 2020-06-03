import { Injectable, Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReturnState } from '../interfaces/return-state';
import { Observable } from 'rxjs';

export interface YesNo {
  message: string;
  confirmed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  public showMessage(notification: ReturnState): void {
    let color: string = notification.success ? 'mat-accent' : 'mat-warn';
    this.snackBar.open(notification.message, undefined, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', color]
    });
  }

  public confirm(message: string): Observable<YesNo> {

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: {confirmed: false, message: message}
    });

    return dialogRef.afterClosed();
  }
}

@Component({
  selector: 'table-dialog',
  template: `<h1 mat-dialog-title>{{data.message}}</h1>
  <div mat-dialog-actions>
    <button mat-button (click)="no()">No</button>
    <button mat-button (click)="yes()" cdkFocusInitial>Yes</button>
  </div>`,
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: YesNo) {}

  protected no(): void {
    this.data.confirmed = false;
    this.dialogRef.close(this.data);
  }

  protected yes(): void {
    this.data.confirmed = true;
    this.dialogRef.close(this.data);
  }

}
