import { Parameter, DataType } from '../interfaces/parameter';

export abstract class Random {

  protected evaluated: boolean = false;
  protected value: Object = 0;

  constructor(
    protected name: string,
    protected description: string
  ) {
  }

  public reset(): void {
    this.evaluated = false;
    this.value = 0;
  }

  protected setValue(value: Object): Object {
    this.evaluated = true;
    this.value = value;
    return value;
  }

  public abstract evaluate(): Object;
  public abstract settings(): Array<Parameter>;

}
