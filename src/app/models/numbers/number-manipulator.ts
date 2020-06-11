import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class NumberManipulator extends RandomNumber{
  constructor(
    protected left: RandomNumber = new RandomNumber(),
    protected right: RandomNumber = new RandomNumber()
  ){
    super(1, 1, 1);
  }

  public getName(includeAll: boolean = false): string {
    if (includeAll) {
      return `NumberManipulator[${this.left.getName(includeAll)}, ${this.right.getName(includeAll)}]`
    }
    else {
      return 'NumberManipulator'
    }
  }

  public getDescription(): string {
    return 'Allow RandomNumbers to be manipulated'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'left', type: DataType.RandomNumber, list: false, description: 'Left side of the operator', default: this.right},
      { name: 'right', type: DataType.RandomNumber, list: false, description: 'Right side of the operator', default: this.left}
    ];
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
