import { RandomString } from './random-string';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { FixedNumber } from '../numbers/fixed-number';
import { Column } from '../column';

export class FixedString extends RandomString{
  constructor(
    protected fixedString: string = 'text'
  ){
    super([fixedString], new FixedNumber(1), '');
  }

  public getName(column?: Column): string {
    return `FixedString[${this.fixedString}]`
  }

  public getDescription(): string {
    return 'Any fixed string literal'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'string', type: DataType.string, list: false, description: 'Any fixed piece of text', default: this.fixedString }
    ];
  }
}
