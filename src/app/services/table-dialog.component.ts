import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableData } from './container.service';
import { Random } from '../models/random';


@Component({
  selector: 'table-dialog',
  templateUrl: 'table-dialog.component.html',
})
export class TableDialogComponent {

  protected value: Random | undefined;

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableData
  ) {
    this.value = data.numRows.clone();
  }


  protected submit(): void {
    if (this.value && this.data.numRows) {
      this.data.numRows.update(this.value.settings());
    }
    this.dialogRef.close(this.data);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

}
