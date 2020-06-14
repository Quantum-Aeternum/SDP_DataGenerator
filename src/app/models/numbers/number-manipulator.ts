import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Column } from '../column';

export class NumberManipulator extends RandomNumber{
  constructor(
    protected left: RandomNumber = new RandomNumber(),
    protected right: RandomNumber = new RandomNumber()
  ){
    super(1, 1, 1);
    this.registerChildRandom(left);
    this.registerChildRandom(right);
  }

  public getName(column?: Column): string {
    return `NumberManipulator[${this.left.getDisplayName(column)}, ${this.right.getDisplayName(column)}]`
  }

  public getDescription(): string {
    return 'Allow RandomNumbers to be manipulated'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'left', type: DataType.RandomNumber, list: false, description: 'Left side of the operator', value: this.left},
      { name: 'right', type: DataType.RandomNumber, list: false, description: 'Right side of the operator', value: this.right}
    ];
  }

  public update(parameters: Parameter[]): void {
    this.left = <RandomNumber>parameters[0].value;
    this.right = <RandomNumber>parameters[1].value;
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(this.left.evaluate());
  }

  public reset(): void {
    super.reset()
    this.left.reset()
    this.right.reset()
  }
}
