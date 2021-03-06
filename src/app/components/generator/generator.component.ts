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
import { Column } from 'src/app/models/column';
import { IntegerNumber } from 'src/app/models/numbers/integer-number';
import { FileDialogComponent } from '../../services/file-dialog/file-dialog.component';

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

    // let second: RandomNumber = new IntegerNumber(100, 200, 2);
    // this.readonlyTable.addColumn('Val', second, true);

    // let group: Table = new Table('Group', second, container);
    // let demand: Table = new Table('Demand', new IntegerNumber(25,50), container);

    // group.addColumn('first', new CurrencyFormat('R', new IntegerNumber(10, 50, 5)));
    // group.addColumn('second', second);

    // let constValCol: Column = new Column(demand, 'const', new FixedNumber(8), false, container);
    // demand.addExistingColumn(constValCol);
    // demand.addColumn('const_ref', constValCol.getValue());
    // demand.addColumn('val', new NumberMultiplication(<RandomNumber>constValCol.getValue(), new IntegerNumber(0, 100, 1)));
    // demand.addColumn('const-1', new NumberSubtraction(<RandomNumber>constValCol.getValue(), new FixedNumber(1)));

    // group.addChild(demand);

    // this.tables.push(group);
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
    this.container.openTableDialog({new: true, name: '', numRows: new IntegerNumber()}).subscribe((tableData: TableData) => {
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
    this.container.openColumnDialog({name: '', value: new IntegerNumber()}).subscribe((columnData: ColumnData) => {
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

  protected save(): void {
    const dialogRef = this.dialog.open(FileDialogComponent, {data: true});
    dialogRef.afterClosed().subscribe((res: ReturnState) => {
      if (res != undefined)
      {
        if (res.success === true)
        {
          localStorage.setItem(res.message + "_tables", JSON.stringify(this.tables));
          localStorage.setItem(res.message + "_consts", JSON.stringify(this.readonlyTable));
          this.notifications.showMessage({success: true, message: "Saved template"});
        }
      }
    });
  }

  protected load(): void {
    const dialogRef = this.dialog.open(FileDialogComponent, {data: false});
    dialogRef.afterClosed().subscribe((res: ReturnState) => {
      if (res != undefined)
      {
        if (res.success === true)
        {
          console.log(localStorage.getItem(res.message + "_tables"));
          console.log(localStorage.getItem(res.message + "_consts"));
          this.notifications.showMessage({success: true, message: "Loaded template"});
        }
      }
    });
  }

}
