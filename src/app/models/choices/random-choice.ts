import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { RandomNumber } from '../numbers/random-number';
import { Column } from '../column';
import { IntegerNumber } from '../numbers/integer-number';

export class RandomChoice extends Random{

  constructor(
    private options: Array<Random> = [new IntegerNumber()]
  ) {
    super();
    options.forEach(option => {
      this.registerChildRandom(option);
    });
  }

  public clone(): Random {
    let clonedOptions: Array<Random> = [];
    this.options.forEach(option => {
      clonedOptions.push(option.clone())
    });
    let clone: RandomChoice = new RandomChoice(clonedOptions);
    clone.owner = this.owner;
    return clone;
  }

  public getDescription(): string {
    return 'Randomly chooses out of a list of options'
  }

  public getType(): DataType {
    return DataType.RandomChoice;
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'options', type: DataType.Random, list: true, description: 'List of options to choose from', value: this.options}
    ];
  }

  public update(parameters: Parameter[]): void {
    this.options = <Array<Random>>parameters[0].value;
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
