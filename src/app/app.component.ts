import { Component } from '@angular/core';
import { Table } from './models/table';
import { Random } from './models/random';
import { RandomNumber } from './models/numbers/random-number';
import { CurrencyFormat } from './models/formats/currency-format';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sdp-gen';

  constructor() {
    let group: Table = new Table('Group', 5, 10);
    let demand: Table = new Table('Demand', 2, 5);
    demand.addColumn('val', new RandomNumber(0, 100, 1));
    group.addChild(demand);
    group.addColumn('first', new CurrencyFormat('R', new RandomNumber(10, 50, 5)));
    group.addColumn('second', new RandomNumber(2, 4, 2));
    demand.addColumn('const', new RandomNumber(8, 8, 1));
    console.log(group.generateData());
    group.removeChild(demand);
    console.log(group.generateData());
  }
}
