import { RandomString } from './random-string';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { FixedNumber } from '../numbers/fixed-number';
import { Column } from '../column';
import { Random } from '../random';

export class FixedString extends RandomString{
  constructor(
    protected fixedString: string = 'text'
  ){
    super([fixedString], new FixedNumber(1), '');
  }

  public clone(): Random {
    let clone: FixedString = new FixedString(this.fixedString);
    clone.owner = this.owner;
    return clone;
  }

  public getName(column?: Column): string {
    return `FixedString[${this.fixedString}]`
  }

  public getDescription(): string {
    return 'Any fixed string literal'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'string', type: DataType.string, list: false, description: 'Any fixed piece of text', value: this.fixedString }
    ];
  }

  public update(parameters: Parameter[]): void {
    this.fixedString = <string>parameters[0].value;
  }
}
