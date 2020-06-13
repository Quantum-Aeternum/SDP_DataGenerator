import { RandomNumber } from './random-number';
import { Column } from '../column';

export class IntegerNumber extends RandomNumber{
  constructor(
    protected min: number = 0,
    protected max: number = 100,
    protected step: number = 1
  ) {
    super(min, max, step);
    if (Math.round(step) == 0) step = 1;
    else if (step < 0) step = -step;
    if (min > max) {
      let tmp: number = max;
      max = min;
      min = tmp;
    }
    this.step = Math.round(step);
    this.min = Math.round(min);
    this.max = Math.round(max);
  }

  public getName(column?: Column): string {
    if (column != undefined) {
      return `IntegerNumber[${this.min}, ${this.max}, ${this.step}]`
    }
    else {
      return 'IntegerNumber'
    }
  }

  public getDescription(): string {
    return 'Random integer number in range'
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    else return this.setValue(Math.round(Number(super.evaluate())));
  }
}
