import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';

export class FloatNumber extends RandomNumber{
  constructor(
    protected min: number,
    protected max: number,
    protected step: number,
    protected accuracy: number
  ) {
    super(min, max, step);
  }

  public static getName(): string {
    return 'FloatNumber'
  }

  public static getDescription(): string {
    return 'Random float number in range'
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

  public static settings(): Array<Parameter> {
    let params: Array<Parameter> = super.settings();
    params.push({ name: 'accuracy', type: DataType.number, list: false, description: 'Decimal places in the number', default: 2});
    return params;
  }
}
