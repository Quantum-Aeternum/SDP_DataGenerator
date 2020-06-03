import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableData } from './table.component';


@Component({
  selector: 'table-dialog',
  templateUrl: 'table-dialog.component.html',
})
export class TableDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableData) {}

  protected cancel(): void {
    this.dialogRef.close();
  }

}
