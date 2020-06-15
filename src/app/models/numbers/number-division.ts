import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';
import { Column } from '../column';
import { Random } from '../random';
import { DataType } from 'src/app/interfaces/parameter';
import { IntegerNumber } from './integer-number';

export class NumberDivision extends NumberManipulator{
  constructor(
    protected left: RandomNumber = new IntegerNumber(),
    protected right: RandomNumber = new IntegerNumber()
  ){
    super(left, right);
  }

  public clone(): Random {
    let clone: NumberDivision = new NumberDivision(<RandomNumber>this.left.clone(), <RandomNumber>this.right.clone());
    clone.owner = this.owner;
    return clone;
  }

  public getDescription(): string {
    return 'Represents a number given by dividing a number (left) by another number (right)'
  }

  public getType(): DataType {
    return DataType.NumberDivision;
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    if (this.right.evaluate() == 0) return this.setValue(0);
    else return this.setValue(Number(this.left.evaluate()) / Number(this.right.evaluate()));
  }
}
