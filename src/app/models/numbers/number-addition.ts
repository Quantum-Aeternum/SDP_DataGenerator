import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';

export class NumberAddition extends NumberManipulator{
  constructor(
    protected left: RandomNumber = new RandomNumber(),
    protected right: RandomNumber = new RandomNumber()
  ){
    super(left, right);
  }

  public getName(tableName?: string, colName?: string): string {
    if (tableName != undefined && colName != undefined) {
      return `NumberAddition[${this.left.getDisplayName(tableName, colName)}, ${this.right.getDisplayName(tableName, colName)}]`
    }
    else {
      return 'NumberAddition'
    }
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
