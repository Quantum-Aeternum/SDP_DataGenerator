import { Component, ApplicationRef } from '@angular/core';
import { Table } from './models/table';
import { RandomNumber } from './models/numbers/random-number';
import { CurrencyFormat } from './models/formats/currency-format';
import { FixedNumber } from './models/numbers/fixed-number';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotificationsService } from './services/notifications.service';
import { ContainerService } from './services/container.service';
import { Column } from './interfaces/column';
import { NumberMultiplication } from './models/numbers/number-multiplication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  protected busy: boolean = false;

  protected table: Table | undefined;
  protected jsonData: JSON = JSON.parse('[]');
  protected downloadUri: SafeUrl = '';
  protected textData: string = '[]';

  protected prettyView: boolean = false;
  protected toggleViewName: "Pretty View" | "Basic View" = "Pretty View";

  constructor(
    protected sanitizer: DomSanitizer,
    public notifications: NotificationsService,
    public container: ContainerService
  ) {

    this.generateDownloadURL();

    let second: RandomNumber = new RandomNumber(100, 200, 2);
    let constCol: Column = {name: 'Val', table: 'READONLY', references: 0, value: second, readonly: true};
    second.owner = constCol;

    let group: Table = new Table('Group', second, container);
    let demand: Table = new Table('Demand', new RandomNumber(25,50), container);
    group.addColumn('first', new CurrencyFormat('R', new RandomNumber(10, 50, 5)));
    group.addColumn('second', second);

    let constVal: RandomNumber = new FixedNumber(8);
    let col: Column = {name: 'const', table: 'Demand', references: 0, value: constVal};
    constVal.owner = col;
    demand.addColumn('const', constVal);
    demand.addColumn('const_ref', constVal);
    demand.addColumn('val', new NumberMultiplication(constVal, new RandomNumber(0, 100, 1)));

    group.addChild(demand);

    this.table = group;
  }

  protected generate(): void {
    let tableData: {[key: string]: Object} = {};
    if (this.table) {
      this.busy = true;
      tableData[this.table.getName()] = this.table.generateData();
      this.textData = JSON.stringify(tableData);
      this.jsonData = JSON.parse(this.textData);
      this.generateDownloadURL();
      this.notifications.showMessage({success: true, message: `Data has been generated`});
      this.busy = false;
    }
  }

  protected generateDownloadURL() {
    let blob = new Blob([this.textData], { type: 'text/json' });
    let url= window.URL.createObjectURL(blob);
    let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url); // This has security issues
    this.downloadUri = uri;
  }

  protected clear(): void {
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

}
