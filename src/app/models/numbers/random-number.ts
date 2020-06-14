import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Column } from '../column';

export class RandomNumber extends Random{

  constructor(
    protected min: number = 0,
    protected max: number = 100,
    protected step: number = 1
  ) {
    super();
    this.fixParameters();
  }

  public clone(): Random {
    let clone: RandomNumber = new RandomNumber(this.min, this.max, this.step);
    clone.owner = this.owner;
    return clone;
  }

  public getName(column?: Column): string {
    return `RandomNumber[${this.min}, ${this.max}, ${this.step}]`
  }

  public getDescription(): string {
    return 'Creates a random value within a set range'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'min', type: DataType.number, list: false, description: 'Minimum value', value: this.min},
      { name: 'max', type: DataType.number, list: false, description: 'Maximum value', value: this.max},
      { name: 'step', type: DataType.number, list: false, description: 'Distance between values', value: this.step}
    ];
  }

  public update(parameters: Parameter[]): void {
    this.min = <number>parameters[0].value;
    this.max = <number>parameters[1].value;
    this.step = <number>parameters[2].value;
    this.fixParameters();
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

  private fixParameters()
  {
    if (this.step == 0) this.step = 1;
    else if (this.step < 0) this.step = -this.step;
    if (this.min > this.max) {
      let tmp: number = this.max;
      this.max = this.min;
      this.min = tmp;
    }
  }
}
