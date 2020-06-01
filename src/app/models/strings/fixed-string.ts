import { RandomString } from './random-string';
import { RandomNumber } from '../numbers/random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class FixedString extends RandomString{
  constructor(
    private fixedString: string
  ){
    super([fixedString], new RandomNumber(1,1,1), '');
  }

  public static getName(): string {
    return 'FixedString'
  }

  public static getDescription(): string {
    return 'Any fixed string literal'
  }

  public static settings(): Array<Parameter> {
    return [
      { name: 'string', type: DataType.string, list: false, description: 'Any fixed piece of text', default: 'text'}
    ];
  }
}
