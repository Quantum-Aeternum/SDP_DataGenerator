import { Component, OnInit } from '@angular/core';
import { Table } from '../../models/table';
import { RandomNumber } from '../../models/numbers/random-number';
import { CurrencyFormat } from '../../models/formats/currency-format';
import { FixedNumber } from '../../models/numbers/fixed-number';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotificationsService } from '../../services/notifications.service';
import { ContainerService, TableData, ColumnData } from '../../services/container.service';
import { NumberMultiplication } from '../../models/numbers/number-multiplication';
import { NumberSubtraction } from '../../models/numbers/number-subtraction';
import { MatDialog } from '@angular/material';
import { ReturnState } from 'src/app/interfaces/return-state';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  protected busy: boolean = false;

  protected readonlyTable: Table = new Table('READONLY', new FixedNumber(1), this.container);
  protected tables: Array<Table> = [];
  protected jsonData: JSON = JSON.parse('[]');
  protected downloadUri: SafeUrl = '';
  protected textData: string = '[]';

  protected prettyView: boolean = false;
  protected toggleViewName: "Pretty View" | "Basic View" = "Pretty View";

  constructor(
    protected sanitizer: DomSanitizer,
    public notifications: NotificationsService,
    public container: ContainerService,
    public dialog: MatDialog
  ) {

    this.generateDownloadURL();

    let second: RandomNumber = new RandomNumber(100, 200, 2);
    this.readonlyTable.addColumn('Val', second, true);

    let group: Table = new Table('Group', second, container);
    let demand: Table = new Table('Demand', new RandomNumber(25,50), container);

    group.addColumn('first', new CurrencyFormat('R', new RandomNumber(10, 50, 5)));
    group.addColumn('second', second);

    let constVal: RandomNumber = new FixedNumber(8);
    demand.addColumn('const', constVal);
    demand.addColumn('const_ref', constVal);
    demand.addColumn('val', new NumberMultiplication(constVal, new RandomNumber(0, 100, 1)));
    demand.addColumn('const-1', new NumberSubtraction(constVal, new FixedNumber(1)));

    group.addChild(demand);

    this.tables.push(group);
  }

  ngOnInit() {
  }

  protected generate(): void {
    this.scrubTables();
    let tableData: {[key: string]: Object} = {};
    this.busy = true;
    this.tables.forEach(table => {
      tableData[table.getName()] = table.generateData();
    });
    this.textData = JSON.stringify(tableData);
    this.jsonData = JSON.parse(this.textData);
    this.generateDownloadURL();
    this.notifications.showMessage({success: true, message: `Data has been generated`});
    this.busy = false;
  }

  protected addTable(): void {
    this.scrubTables();
    this.container.openTableDialog({new: true, name: '', numRows: new RandomNumber()}).subscribe((tableData: TableData) => {
      if (tableData) {
        if (this.container.isTableNameAvailable(tableData.name)) {
          this.tables.push(new Table(tableData.name, tableData.numRows, this.container));
        }
        else {
          this.notifications.showMessage({success: false, message: `Table name already used or invalid: ${tableData.name}`});
        }
      }
    });
  }

  protected addReadonlyValue(): void {
    this.container.openColumnDialog({new: true, name: '', value: new RandomNumber()}).subscribe((columnData: ColumnData) => {
      if (columnData) {
        let response: ReturnState = this.readonlyTable.addColumn(columnData.name, columnData.value, true);
        this.notifications.showMessage(response);
      }
    });
  }

  protected generateDownloadURL() {
    this.scrubTables();
    let blob = new Blob([this.textData], { type: 'text/json' });
    let url= window.URL.createObjectURL(blob);
    let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url); // This has security issues
    this.downloadUri = uri;
  }

  protected clear(): void {
    this.scrubTables();
    this.busy = true;
    this.jsonData = JSON.parse('[]');
    this.downloadUri = '';
    this.textData = '[]';
    this.busy = false;
  }

  protected toggleView(): void {
    this.busy = true;
    this.prettyView = !this.prettyView;
    if (this.prettyView) this.toggleViewName = "Basic View";
    else this.toggleViewName = "Pretty View";
    this.busy = false;
  }

  private scrubTables(): void {
    this.tables = this.tables.filter(table => !table.shouldDispose());
  }

}
