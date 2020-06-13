import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'src/app/interfaces/column';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ContainerService } from 'src/app/services/container.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ColumnDialogComponent } from './column-dialog.component';
import { ReturnState } from 'src/app/interfaces/return-state';
import { Random } from 'src/app/models/random';
import { RandomNumber } from 'src/app/models/numbers/random-number';
import { Table } from 'src/app/models/table';

export interface ColumnData {
  new: boolean;
  name: string;
  value: Random;
  delete?: boolean;
}

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() table: Table | undefined;
  @Input() column: Column | undefined;
  protected buttons: Array<string> = ["Edit Column", "Delete Column"]

  constructor(
    public notifications: NotificationsService,
    public container: ContainerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  protected editColumnData(): void {
    if (this.column) {
      this.openColumnDialog({new: false, name: this.column.name, value: this.column.value}).subscribe((columnData: ColumnData) => {
        if (this.column && this.table && columnData) {
          let returnState: ReturnState = {success: true, message: `Updated column: ${columnData.name}`};
          if (columnData.delete === true)
          {
            returnState = this.table.removeColumn(this.column.name);
          }
          else
          {
            if (this.column.name != columnData.name) {
              returnState = this.table.setColumnName(this.column.name, columnData.name);
            }
            if (returnState.success === true) {
              this.column.value = columnData.value;
            }
          }
          this.notifications.showMessage(returnState);
        }
      });
    }
  }

  private openColumnDialog(data: ColumnData): Observable<ColumnData> {

    const dialogRef = this.dialog.open(ColumnDialogComponent, {
      width: '300px',
      data: data
    });

    return dialogRef.afterClosed();
  }

}
