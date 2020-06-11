import { Format } from './format';
import { RandomNumber } from '../numbers/random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Random } from '../random';

export class CurrencyFormat extends Format{

  constructor(
    protected symbol: string = 'R',
    protected obj: RandomNumber = new RandomNumber()
  ){
    super(symbol, obj);
  }

  public getName(tableName?: string, colName?: string): string {
    if (tableName != undefined && colName != undefined) {
      return `CurrencyFormat[${this.symbol}, ${this.obj.getDisplayName(tableName, colName)}]`
    }
    else {
      return 'CurrencyFormat'
    }
  }

  public getDescription(): string {
    return 'Adds a symbol to the front of a number and rounds to the closest two decimals'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'symbol', type: DataType.string, list: false, description: 'Currency symbol', default: this.symbol},
      { name: 'obj', type: DataType.RandomNumber, list: false, description: 'Numerical amount', default: new RandomNumber()}
    ];
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;

    let roundedVal:number = Math.round(Number(this.obj.evaluate()) * 100) / 100;
    let amount = this.symbol + roundedVal;

    // Add leading zeros if needed
    let dotIndex = amount.indexOf('.');
    if (dotIndex < 0) {
      amount += '.00';
    }
    else {
      let missing = 2 - (amount.length - dotIndex - 1);
      for (let i = 0; i < missing; i++) {
        amount += '0';
      }
    }

    return this.setValue(amount);
  }
}
