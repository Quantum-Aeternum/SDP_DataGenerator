import { Component } from '@angular/core';
import { Table } from './models/table';
import { RandomNumber } from './models/numbers/random-number';
import { CurrencyFormat } from './models/formats/currency-format';
import { Random } from './models/random';
import { FixedNumber } from './models/numbers/fixed-number';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private table: Table = new Table('Temp', 1, 1);
  public jsonData: JSON = JSON.parse('[]');
  public textData: string = '';
  public prettyView: boolean = true;

  constructor() {

    let group: Table = new Table('Group', 50, 100);
    let demand: Table = new Table('Demand', 2, 5);
    demand.addColumn('val', new RandomNumber(0, 100, 1));
    group.addChild(demand);
    group.addColumn('first', new CurrencyFormat('R', new RandomNumber(10, 50, 5)));
    group.addColumn('second', new RandomNumber(2, 4, 2));
    demand.addColumn('const', new FixedNumber(8));

    this.table = group;
  }

  public generate(): void {
    let tableData: {[key: string]: Object} = {};
    tableData[this.table.getName()] = this.table.generateData();
    this.textData = JSON.stringify(tableData);
    this.jsonData = JSON.parse(this.textData);
  }

  public toggleView(): void {
    this.prettyView = !this.prettyView;
  }

}
