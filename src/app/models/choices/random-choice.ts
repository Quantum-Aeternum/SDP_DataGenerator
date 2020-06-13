import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { RandomNumber } from '../numbers/random-number';
import { Column } from '../column';

export class RandomChoice extends Random{

  constructor(
    private options: Array<Random> = [new RandomNumber()]
  ) {
    super();
    options.forEach(option => {
      this.registerChildRandom(option);
    });
  }

  public getName(column?: Column): string {
    let optionsString = this.options.map(o => o.getName()).join(', ');
    return `RandomChoice[${optionsString}]`;
  }

  public getDescription(): string {
    return 'Randomly chooses out of a list of options'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'options', type: DataType.Random, list: true, description: 'List of options to choose from', value: this.options}
    ];
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;

    let index: number = Math.round(Math.random() * this.options.length - 1);
    if (index > this.options.length - 1) {
      return this.setValue(this.options[this.options.length - 1]);
    }
    else {
      return this.setValue(this.options[index]);
    }
  }

  public reset(): void {
    super.reset();
    this.options.forEach(random => {
      random.reset();
    });
  }
}
