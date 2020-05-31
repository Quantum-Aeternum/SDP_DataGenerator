import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class RandomChoice extends Random{

  constructor(
    private options: Array<Random>
  ) {
    super('RandomChoice', 'Randomly chooses out of a list of options')
  }

  public evaluate(): Object {
    let index: number = Math.round(Math.random() * this.options.length - 1);
    if (index > this.options.length - 1) {
      return this.setValue(this.options[this.options.length - 1]);
    }
    else {
      return this.setValue(this.options[index]);
    }
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'options', type: DataType.Random, list: true, description: 'List of options to choose from', default: 0}
    ];
  }

  public reset(): void {
    super.reset();
    this.options.forEach(random => {
      random.reset();
    });
  }
}
