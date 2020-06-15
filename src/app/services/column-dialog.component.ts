import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColumnData } from './container.service';
import { Random } from '../models/random';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'column-dialog',
  templateUrl: 'column-dialog.component.html',
})
export class ColumnDialogComponent {

  protected value: Random | undefined;

  constructor(
    protected notifications: NotificationsService,
    public dialogRef: MatDialogRef<ColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnData
  ) {
    this.value = data.value.clone();
  }

  changeRandom(newRandom: Random): void {
    this.value = newRandom;
  }

  protected submit(): void {
    if (this.value) this.data.value = this.value;
    this.dialogRef.close(this.data);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected delete(): void {
    this.data.delete = true;
    this.dialogRef.close(this.data);
  }
}
