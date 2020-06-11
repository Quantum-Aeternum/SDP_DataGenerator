import { RandomString } from './random-string';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { FixedNumber } from '../numbers/fixed-number';

export class FixedString extends RandomString{
  constructor(
    protected fixedString: string = 'text'
  ){
    super([fixedString], new FixedNumber(1), '');
  }

  public getName(includeAll: boolean = false): string {
    if (includeAll) {
      return `FixedString[${this.fixedString}]`
    }
    else {
      return 'FixedString'
    }
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
