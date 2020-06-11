import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class RandomNumber extends Random{

  constructor(
    protected min: number = 0,
    protected max: number = 100,
    protected step: number = 1
  ) {
    super();
    if (step == 0) step = 1;
    else if (step < 0) step = -step;
    if (min > max) {
      let tmp: number = max;
      max = min;
      min = tmp;
    }
  }

  public getName(tableName?: string, colName?: string): string {
    if (tableName != undefined && colName != undefined) {
      return `RandomNumber[${this.min}, ${this.max}, ${this.step}]`
    }
    else {
      return 'RandomNumber'
    }
  }

  public getDescription(): string {
    return 'Creates a random value within a set range'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'min', type: DataType.number, list: false, description: 'Minimum value', default: this.min},
      { name: 'max', type: DataType.number, list: false, description: 'Maximum value', default: this.max},
      { name: 'step', type: DataType.number, list: false, description: 'Distance between values', default: this.step}
    ];
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;

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
