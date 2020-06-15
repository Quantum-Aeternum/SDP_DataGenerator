import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';
import { Column } from '../column';
import { Random } from '../random';
import { DataType } from 'src/app/interfaces/parameter';
import { IntegerNumber } from './integer-number';

export class NumberSubtraction extends NumberManipulator{
  constructor(
    protected left: RandomNumber = new IntegerNumber(),
    protected right: RandomNumber = new IntegerNumber()
  ){
    super(left, right);
  }

  public clone(): Random {
    let clone: NumberSubtraction = new NumberSubtraction(<RandomNumber>this.left.clone(), <RandomNumber>this.right.clone());
    clone.owner = this.owner;
    return clone;
  }

  public getName(column?: Column): string {
    return `NumberSubtraction[${this.left.getDisplayName(column)}, ${this.right.getDisplayName(column)}]`
  }

  public getDescription(): string {
    return 'Represents a number by subtracting one number (right) from another (left)'
  }

  public getType(): DataType {
    return DataType.NumberSubtraction;
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(Number(this.left.evaluate()) - Number(this.right.evaluate()));
  }
}
