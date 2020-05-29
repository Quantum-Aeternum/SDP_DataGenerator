import { Parameter, DataType } from '../interfaces/parameter';

export class Random {

  constructor(
    protected name: string,
    protected description: string,
    protected min: number,
    protected max: number,
    protected step: number
  ) {

  }

  public evaluate(): number {
    let upper = this.max / this.step;
    let lower = this.min / this.step;
    let random = (Math.random() * (upper - lower)) + lower;
    let value = random * this.step;
    return value;
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'min', type: DataType.number, description: 'Minimum value', default: 0},
      { name: 'max', type: DataType.number, description: 'Maximum value', default: 100},
      { name: 'step', type: DataType.number, description: 'Distance between values', default: 1}
    ];
  }

}
