import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColumnData } from './container.service';

@Component({
  selector: 'column-dialog',
  templateUrl: 'column-dialog.component.html',
})
export class ColumnDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnData) {}

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected delete(): void {
    this.data.delete = true;
    this.dialogRef.close(this.data);
  }
}
