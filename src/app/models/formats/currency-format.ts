import { Format } from './format';
import { RandomNumber } from '../numbers/random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class CurrencyFormat extends Format{

  constructor(
    protected symbol: string,
    protected value: RandomNumber
  ){
    super(symbol, value);
    this.name = 'CurrencyFormat';
    this.description = 'Adds a symbol to the front of a number and rounds to the closest two decimals';
  }

  public evaluate(): Object {
    let roundedVal:number = Math.floor(Number(this.value.evaluate()) * 100) / 100;
    let amount = this.symbol + roundedVal;
    return this.setValue(amount);
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'symbol', type: DataType.string, list: false, description: 'Currency symbol', default: 'R'},
      { name: 'value', type: DataType.RandomNumber, list: false, description: 'Numerical amount', default: new RandomNumber(0,100,0.05)}
    ];
  }

  public reset(): void {
    super.reset();
    this.value.reset();
  }
}
