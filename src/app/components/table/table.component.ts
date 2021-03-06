import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { ReturnState } from 'src/app/interfaces/return-state';
import { NotificationsService, YesNo } from 'src/app/services/notifications.service';
import { ContainerService, TableData, ColumnData } from 'src/app/services/container.service';
import { RandomNumber } from 'src/app/models/numbers/random-number';
import { IntegerNumber } from 'src/app/models/numbers/integer-number';

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
    public container: ContainerService
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
        this.addColumn();
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
          this.notifications.showMessage(returnState);
        }
      });
    }
  }

  protected editTableData(): void {
    if (this.table) {
      this.container.openTableDialog({new: false, name: this.table.getName(), numRows: this.table.getNumRows()}).subscribe((tableData: TableData) => {
        if (this.table && tableData) {
          let returnState: ReturnState = {success: true, message: `Updated table: ${tableData.name}`};
          if (this.table.getName() != tableData.name) {
            returnState = this.table.setName(tableData.name);
          }
          this.table.setNumRows(tableData.numRows);
          this.notifications.showMessage(returnState);
        }
      });
    }
  }

  protected addNestedTable(): void {
    if (this.table) {
      this.container.openTableDialog({new: true, name: '', numRows: new IntegerNumber()}).subscribe((tableData: TableData) => {
        if (this.table && tableData) {
          if (this.container.isTableNameAvailable(tableData.name)) {
            let returnState: ReturnState = this.table.addChild(new Table(tableData.name, tableData.numRows, this.container));
            this.notifications.showMessage(returnState);
          }
          else {
            this.notifications.showMessage({success: false, message: `Table name already used or invalid: ${tableData.name}`});
          }
        }
      });
    }
  }

  protected addColumn(): void {
    this.container.openColumnDialog({name: '', value: new IntegerNumber()}).subscribe((columnData: ColumnData) => {
      if (this.table && columnData) {
        let response: ReturnState = this.table.addColumn(columnData.name, columnData.value);
        this.notifications.showMessage(response);
      }
    });
  }

}
