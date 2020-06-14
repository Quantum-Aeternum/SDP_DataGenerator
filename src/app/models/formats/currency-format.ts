import { Format } from './format';
import { RandomNumber } from '../numbers/random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Random } from '../random';
import { Column } from '../column';

export class CurrencyFormat extends Format{

  constructor(
    protected symbol: string = 'R',
    protected obj: RandomNumber = new RandomNumber()
  ){
    super(symbol, obj);
  }

  public clone(): Random {
    let clone: CurrencyFormat = new CurrencyFormat(this.symbol, <RandomNumber>this.obj.clone());
    clone.owner = this.owner;
    return clone;
  }

  public getName(column?: Column): string {
    return `CurrencyFormat[${this.symbol}, ${this.obj.getDisplayName(column)}]`
  }

  public getDescription(): string {
    return 'Adds a symbol to the front of a number and rounds to the closest two decimals'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'symbol', type: DataType.string, list: false, description: 'Currency symbol', value: this.symbol},
      { name: 'obj', type: DataType.RandomNumber, list: false, description: 'Numerical amount', value: this.obj}
    ];
  }

  public update(parameters: Parameter[]): void {
    this.symbol = <string>parameters[0].value;
    this.obj = <RandomNumber>parameters[1].value;
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
