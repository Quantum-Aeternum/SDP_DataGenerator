import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { ReturnState } from 'src/app/interfaces/return-state';
import { NotificationsService, YesNo } from 'src/app/services/notifications.service';
import { TableDialogComponent } from './table-dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ContainerService } from 'src/app/services/container.service';

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
  protected buttons: Array<string> = ["Edit Table", "Delete Table", "Add Column", "Add Nested Table"];

  constructor(
    public notifications: NotificationsService,
    public container: ContainerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  protected buttonClicked(id: number): void {
    switch (id) {
      case 0:
        this.editTableData();
        break;
      case 1:
        this.removeTable();
        break;
      case 2:
        break;
      case 3:
        this.addNestedTable();
        break;
    }
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
        if (this.table && tableData) {
          let returnState: ReturnState = {success: true, message: `Updated table: ${tableData.name}`};
          if (this.table.getName() != tableData.name) {
            returnState = this.table.setName(tableData.name);
          }
          if (returnState.success === true) {
            this.table.setMaxRows(tableData.max);
            this.table.setMinRows(tableData.min);
          }
          this.notifications.showMessage(returnState);
        }
      });
    }
  }

  protected addNestedTable(): void {
    if (this.table) {
      this.openTableDialog({new: true, name: '', min: 1, max: 1}).subscribe((tableData: TableData) => {
        if (this.table && tableData) {
          if (this.container.isTableNameAvailable(tableData.name)) {
            let returnState: ReturnState = this.table.addChild(new Table(tableData.name, tableData.min, tableData.max, this.container));
            this.notifications.showMessage(returnState);
          }
          else {
            this.notifications.showMessage({success: false, message: `Table name already used: ${tableData.name}`});
          }
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
