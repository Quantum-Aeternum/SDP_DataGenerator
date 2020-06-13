import { Component, OnInit } from '@angular/core';
import { Table } from '../../models/table';
import { RandomNumber } from '../../models/numbers/random-number';
import { CurrencyFormat } from '../../models/formats/currency-format';
import { FixedNumber } from '../../models/numbers/fixed-number';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotificationsService } from '../../services/notifications.service';
import { ContainerService } from '../../services/container.service';
import { Column } from '../../models/column';
import { NumberMultiplication } from '../../models/numbers/number-multiplication';
import { NumberSubtraction } from '../../models/numbers/number-subtraction';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  protected busy: boolean = false;

  protected readonlyTable: Table = new Table('READONLY', new FixedNumber(1), this.container);
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

    this.table = group;
  }

  ngOnInit() {
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
