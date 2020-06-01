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

  constructor() {

    console.log(Random.settings());
    console.log(RandomNumber.settings());
    console.log(FixedNumber.settings());
    console.log(CurrencyFormat.settings());

    let group: Table = new Table('Group', 5, 10);
    let demand: Table = new Table('Demand', 2, 5);
    demand.addColumn('val', new RandomNumber(0, 100, 1));
    group.addChild(demand);
    group.addColumn('first', new CurrencyFormat('R', new RandomNumber(10, 50, 5)));
    group.addColumn('second', new RandomNumber(2, 4, 2));
    demand.addColumn('const', new FixedNumber(8));
    console.log(group.generateData());
    group.removeChild(demand);
    console.log(group.generateData());
  }

}
