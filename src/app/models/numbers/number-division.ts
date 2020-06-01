import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';

export class NumberDivision extends NumberManipulator{
  constructor(
    protected left: RandomNumber,
    protected right: RandomNumber
  ){
    super(left, right);
  }

  public static getName(): string {
    return 'NumberDivision'
  }

  public static getDescription(): string {
    return 'Represents a number given by dividing a number (left) by another number (right)'
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    if (this.right.evaluate() == 0) return this.setValue(0);
    else return this.setValue(Number(this.left.evaluate()) / Number(this.right.evaluate()));
  }
}
