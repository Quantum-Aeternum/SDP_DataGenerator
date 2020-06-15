import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableData } from './container.service';
import { RandomNumber } from '../models/numbers/random-number';
import { Parameter, DataType } from '../interfaces/parameter';


@Component({
  selector: 'table-dialog',
  templateUrl: 'table-dialog.component.html',
})
export class TableDialogComponent {

  protected value: RandomNumber | undefined;
  protected settings: Parameter = {name: "Num Rows", description: "Number of rows to generate for the table", list: false, type: DataType.RandomNumber, value: <RandomNumber>this.value}

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableData
  ) {
    this.value = <RandomNumber>data.numRows.clone();
  }

  commit(obj: Object): void {
    this.value = <RandomNumber>obj;
  }

  protected submit(): void {
    if (this.value) this.data.numRows = this.value;
    this.dialogRef.close(this.data);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

}
