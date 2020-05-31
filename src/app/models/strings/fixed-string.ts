import { RandomString } from './random-string';
import { RandomNumber } from '../numbers/random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class FixedString extends RandomString{
  constructor(
    private fixedString: string
  ){
    super([fixedString], new RandomNumber(1,1,1), '');
    this.name = 'FixedString';
    this.description = 'Any fixed string literal';
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'string', type: DataType.string, list: false, description: 'Any fixed piece of text', default: 'text'}
    ];
  }
}
