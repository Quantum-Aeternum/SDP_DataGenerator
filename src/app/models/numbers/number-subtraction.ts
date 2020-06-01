import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';

export class NumberSubtraction extends NumberManipulator{
  constructor(
    protected left: RandomNumber,
    protected right: RandomNumber
  ){
    super(left, right);
  }

  public static getName(): string {
    return 'NumberSubtraction'
  }

  public static getDescription(): string {
    return 'Represents a number by subtracting one number (right) from another (left)'
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(Number(this.left.evaluate()) - Number(this.right.evaluate()));
  }
}
