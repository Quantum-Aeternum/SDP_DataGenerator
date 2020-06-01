import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';

export class NumberAddition extends NumberManipulator{
  constructor(
    protected left: RandomNumber,
    protected right: RandomNumber
  ){
    super(left, right);
  }

  public static getName(): string {
    return 'NumberAddition'
  }

  public static getDescription(): string {
    return 'Represents a number by adding two numbers (left and right)'
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(Number(this.left.evaluate()) + Number(this.right.evaluate()));
  }
}
