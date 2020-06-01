import { Format } from './format';
import { RandomNumber } from '../numbers/random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class CurrencyFormat extends Format{

  constructor(
    protected symbol: string,
    protected obj: RandomNumber
  ){
    super(symbol, obj);
  }

  public static getName(): string {
    return 'CurrencyFormat'
  }

  public static getDescription(): string {
    return 'Adds a symbol to the front of a number and rounds to the closest two decimals'
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

  public static settings(): Array<Parameter> {
    return [
      { name: 'symbol', type: DataType.string, list: false, description: 'Currency symbol', default: 'R'},
      { name: 'value', type: DataType.RandomNumber, list: false, description: 'Numerical amount', default: new RandomNumber(0,100,0.05)}
    ];
  }
}
