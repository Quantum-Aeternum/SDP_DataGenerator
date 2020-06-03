import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { ReturnState } from 'src/app/interfaces/return-state';
import { NotificationsService, YesNo } from 'src/app/services/notifications.service';
import { TableDialogComponent } from './table-dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

export interface TableData {
  new: boolean;
  name: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() table: Table | undefined;

  constructor(
    protected notifications: NotificationsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  protected removeTable(): void {
    if (this.table) {
      this.notifications.confirm(`Are you sure you want to delete ${this.table.getName()}?`).subscribe((result: YesNo) => {
        if (this.table && result && result.confirmed === true) {
          let returnState: ReturnState = this.table.logicallyDelete();
          if (!this.table.hasParent()) {
            this.notifications.showMessage(returnState);
          }
          this.table = undefined;
        }
      });
    }
  }

  protected editTableData(): void {
    if (this.table) {
      this.openTableDialog({new: false, name: this.table.getName(), min: this.table.getMinRows(), max: this.table.getMaxRows()}).subscribe((tableData: TableData) => {
        if (this.table && tableData)
        {

        }
      });
    }
  }

  protected addNestedTable(): void {
    if (this.table) {
      this.openTableDialog({new: true, name: '', min: 1, max: 1}).subscribe((tableData: TableData) => {
        if (this.table && tableData)
        {
          let returnState: ReturnState = this.table.addChild(new Table(tableData.name, tableData.min, tableData.max));
          this.notifications.showMessage(returnState);
        }
      });
    }
  }

  private openTableDialog(data: TableData): Observable<TableData> {

    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '250px',
      data: data
    });

    return dialogRef.afterClosed();
  }

}
