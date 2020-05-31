import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class FixedNumber extends RandomNumber{
  constructor(
    protected value: number
  ) {
    super(value, value, 1);
    this.value = value;
    this.name = 'FixedNumber';
    this.description = 'Any given number';
  }

  public evaluate(): Object {
    return this.value;
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'value', type: DataType.number, list: false, description: 'Any number', default: 1}
    ];
  }

  public reset(): void {
    this.evaluated = false;
  }
}
