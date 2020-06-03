import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { ReturnState } from 'src/app/interfaces/return-state';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() table: Table | undefined;
  protected newChildTableName: string = '';

  constructor(
    protected notifications: NotificationsService
  ) { }

  ngOnInit() {
  }

  protected removeTable(): void {
    if (this.table) {
      let returnState: ReturnState = this.table.logicallyDelete();
      if (!this.table.hasParent()) {
        this.notifications.showMessage(returnState.message);
      }
      this.table = undefined;
    }
  }

  protected addNestedTable(): void {
    if (this.table) {
      let returnState: ReturnState = this.table.addChild(new Table(this.newChildTableName, 1, 1));
      if (returnState.success) this.newChildTableName = '';
      this.notifications.showMessage(returnState.message);
    }
  }

}
