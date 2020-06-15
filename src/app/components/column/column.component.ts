import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'src/app/models/column';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ContainerService, ColumnData } from 'src/app/services/container.service';
import { ReturnState } from 'src/app/interfaces/return-state';
import { Table } from 'src/app/models/table';

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
    public container: ContainerService
  ) { }

  ngOnInit() {
  }

  protected editColumnData(): void {
    if (this.column) {
      this.container.openColumnDialog({name: this.column.getName(), value: this.column.getValue(), column: this.column}).subscribe((columnData: ColumnData) => {
        if (this.column && this.table && columnData) {
          let returnState: ReturnState = {success: true, message: `Updated column: ${columnData.name}`};
          if (columnData.delete === true)
          {
            returnState = this.table.removeColumn(this.column.getName());
          }
          else
          {
            if (this.column.getName() != columnData.name) {
              returnState = this.table.setColumnName(this.column, columnData.name);
            }
            if (columnData.value.getType() != this.column.getValue().getType()) {
              const refCount: number = this.column.getReferenceCount();
              if (refCount > 0) {
                returnState = {success: false, message: `Cannot change type since the column still has ${refCount} reference(s)`};
              }
              else {
                this.column.changeValue(columnData.value);
              }
            }
            else {
              this.column.updateValue(columnData.value);
            }
          }
          this.notifications.showMessage(returnState);
        }
      });
    }
  }

}
