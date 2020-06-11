import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';

export class NumberMultiplication extends NumberManipulator{
  constructor(
    protected left: RandomNumber = new RandomNumber(),
    protected right: RandomNumber = new RandomNumber()
  ){
    super(left, right);
  }

  public getName(includeAll: boolean = false): string {
    if (includeAll) {
      return `NumberMultiplication[${this.left.getName(includeAll)}, ${this.right.getName(includeAll)}]`
    }
    else {
      return 'NumberMultiplication'
    }
  }

  public getDescription(): string {
    return 'Represents a number by multiplying two numbers (left and right)'
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(Number(this.left.evaluate()) * Number(this.right.evaluate()));
  }
}
