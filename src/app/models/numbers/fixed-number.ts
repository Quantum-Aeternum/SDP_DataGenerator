import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Column } from '../column';

export class FixedNumber extends RandomNumber{
  constructor(
    protected value: number = 1
  ) {
    super(value, value, 1);
    this.value = value;
  }

  public getName(column?: Column): string {
    if (column != undefined) {
      return `FixedNumber[${this.value}]`
    }
    else {
      return 'FixedNumber'
    }
  }

  public getDescription(): string {
    return 'Any given number'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'value', type: DataType.number, list: false, description: 'Any number', default: this.value}
    ];
  }

  public evaluate(): Object {
    return this.value;
  }

  public reset(): void {
    this.evaluated = false;
  }
}
