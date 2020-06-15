import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Column } from '../column';
import { Random } from '../random';

export class FloatNumber extends RandomNumber{
  constructor(
    protected min: number = 0,
    protected max: number = 100,
    protected step: number = 1,
    protected accuracy: number = 2
  ) {
    super(min, max, step);
    if (this.accuracy < 0) this.accuracy = 0;
  }

  public clone(): Random {
    let clone: FloatNumber = new FloatNumber(this.min, this.max, this.step, this.accuracy);
    clone.owner = this.owner;
    return clone;
  }

  public getDescription(): string {
    return 'Random float number in range'
  }

  public getType(): DataType {
    return DataType.FloatNumber;
  }

  public settings(): Array<Parameter> {
    let params: Array<Parameter> = super.settings();
    params.push({ name: 'accuracy', type: DataType.number, list: false, description: 'Decimal places in the number', value: this.accuracy});
    return params;
  }

  public update(parameters: Parameter[]): void {
    super.update(parameters);
    this.accuracy = <number>parameters[3].value;
    if (this.accuracy < 0) this.accuracy = 0;
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;

    let upper: number = this.max / this.step;
    let lower: number = this.min / this.step;
    let random: number = Math.round((Math.random() * (upper - lower)) + lower);
    let value: number = random * this.step;
    value = Number(value.toFixed(this.accuracy));

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
