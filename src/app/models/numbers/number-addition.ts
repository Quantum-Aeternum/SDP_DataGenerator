import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';
import { Column } from '../column';

export class NumberAddition extends NumberManipulator{
  constructor(
    protected left: RandomNumber = new RandomNumber(),
    protected right: RandomNumber = new RandomNumber()
  ){
    super(left, right);
  }

  public getName(column?: Column): string {
    return `NumberAddition[${this.left.getDisplayName(column)}, ${this.right.getDisplayName(column)}]`
  }

  public getDescription(): string {
    return 'Represents a number by adding two numbers (left and right)'
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(Number(this.left.evaluate()) + Number(this.right.evaluate()));
  }
}
