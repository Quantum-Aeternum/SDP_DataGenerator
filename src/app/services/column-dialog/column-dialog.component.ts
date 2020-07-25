import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Random } from 'src/app/models/random';
import { NotificationsService } from '../notifications.service';
import { ColumnData } from '../container.service';

@Component({
  selector: 'column-dialog',
  templateUrl: 'column-dialog.component.html',
})
export class ColumnDialogComponent {

  protected value: Random | undefined;
  protected formControl = new FormControl('', [Validators.required]);

  constructor(
    protected notifications: NotificationsService,
    public dialogRef: MatDialogRef<ColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnData
  ) {
    this.value = data.value.clone();
  }

  commit(obj: Object): void {
    this.value = <Random>obj;
  }

  protected submit(): void {

    if (this.data.name.trim() == "") {
      return;
    }

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
