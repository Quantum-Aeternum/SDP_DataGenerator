import { Component } from '@angular/core';
import { Table } from './models/table';
import { RandomNumber } from './models/numbers/random-number';
import { CurrencyFormat } from './models/formats/currency-format';
import { Random } from './models/random';
import { FixedNumber } from './models/numbers/fixed-number';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  protected busy: boolean = false;

  protected table: Table = new Table('Temp', 1, 1);
  protected jsonData: JSON = JSON.parse('[]');
  protected downloadUri: SafeUrl = '';
  protected textData: string = '[]';
  protected prettyView: boolean = true;

  constructor(
    protected sanitizer: DomSanitizer,
    protected notifications: NotificationsService
  ) {

    this.generateDownloadURL();

    let group: Table = new Table('Group', 10, 20);
    let demand: Table = new Table('Demand', 10, 20);
    demand.addColumn('val', new RandomNumber(0, 100, 1));
    group.addChild(demand);
    group.addColumn('first', new CurrencyFormat('R', new RandomNumber(10, 50, 5)));
    group.addColumn('second', new RandomNumber(2, 4, 2));
    demand.addColumn('const', new FixedNumber(8));

    this.table = group;
  }

  protected generate(): void {
    this.busy = true;
    let tableData: {[key: string]: Object} = {};
    tableData[this.table.getName()] = this.table.generateData();
    this.textData = JSON.stringify(tableData);
    this.jsonData = JSON.parse(this.textData);
    this.generateDownloadURL();
    this.busy = false;
    this.notifications.showMessage({success: true, message: `Data has been generated`});
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
    this.prettyView = !this.prettyView;
  }

}
