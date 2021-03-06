import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { RandomNumber } from 'src/app/models/numbers/random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { TableData } from '../container.service';


@Component({
  selector: 'table-dialog',
  templateUrl: 'table-dialog.component.html',
})
export class TableDialogComponent {

  protected value: RandomNumber | undefined;
  protected formControl = new FormControl('', [Validators.required]);
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

    if (this.data.name.trim() == "") {
      return;
    }

    if (this.value) this.data.numRows = this.value;
    this.dialogRef.close(this.data);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

}
