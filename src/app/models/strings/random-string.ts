import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { RandomNumber } from '../numbers/random-number';

export class RandomString extends Random{

  constructor(
    protected alphabet: Array<string>,
    protected length: RandomNumber,
    protected separator: string
  ) {
    super('RandomString', 'Creates a random string based on its alphabet')
  }

  public evaluate(): Object {
    let length: number = Number(this.length.evaluate());
    let generated: string = '';
    let index: number = 0;
    for (let i = 0; i < length; i++) {
      index = Math.round(Math.random() * this.alphabet.length - 1);
      if (index > this.alphabet.length - 1) {
        index = this.alphabet.length - 1
      }
      generated += this.alphabet[index];
    }
    return this.setValue(generated);
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'alphabet', type: DataType.string, list: true, description: 'Symbols (characters or strings) to use when creating the string', default: ['a','b','c']},
      { name: 'length', type: DataType.RandomNumber, list: false, description: 'Number of symbols to concatenate', default: new RandomNumber(4,6,1)},
      { name: 'separator', type: DataType.string, list: false, description: 'Character or string to put between the concatenated symbols', default: ''}
    ];
  }

  public reset(): void {
    super.reset();
    this.length.reset();
  }
}
