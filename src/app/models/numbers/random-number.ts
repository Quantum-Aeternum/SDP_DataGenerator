import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class RandomNumber extends Random{

  constructor(
    protected min: number,
    protected max: number,
    protected step: number
  ) {
    super('RandomNumber', 'Creates a random value within a set range');
    if (step == 0) step = 1;
    else if (step < 0) step = -step;
    if (min > max) {
      let tmp: number = max;
      max = min;
      min = tmp;
    }
  }

  public evaluate(): Object {

    // Check whether or not the internal state should be used
    if (this.evaluated == true) {
      return this.setValue(this.value);
    }
    else {
      let upper: number = this.max / this.step;
      let lower: number = this.min / this.step;
      let random: number = Math.round((Math.random() * (upper - lower)) + lower);
      let value: number = random * this.step;

      // Compensate for rounding and step issues
      if (value > this.max) {
        if (this.max % this.step == 0) {
          return this.setValue(this.max);
        }
        else {
          return this.setValue(value - this.step);
        }
      }
      else {
        return this.setValue(value);
      }
    }
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'min', type: DataType.number, list: false, description: 'Minimum value', default: 0},
      { name: 'max', type: DataType.number, list: false, description: 'Maximum value', default: 100},
      { name: 'step', type: DataType.number, list: false, description: 'Distance between values', default: 1}
    ];
  }
}
