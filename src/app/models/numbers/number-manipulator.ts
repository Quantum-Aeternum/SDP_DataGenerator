import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class NumberManipulator extends RandomNumber{
  constructor(
    protected left: RandomNumber,
    protected right: RandomNumber
  ){
    super(1, 1, 1);
    this.name = 'NumberManipulator';
    this.description = 'Allow RandomNumbers to be manipulated'
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(this.left.evaluate());
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'left', type: DataType.RandomNumber, list: false, description: 'Left side of the operator', default: new RandomNumber(1,1,1)},
      { name: 'right', type: DataType.RandomNumber, list: false, description: 'Right side of the operator', default: new RandomNumber(1,1,1)}
    ];
  }

  public reset(): void {
    super.reset()
    this.left.reset()
    this.right.reset()
  }
}
