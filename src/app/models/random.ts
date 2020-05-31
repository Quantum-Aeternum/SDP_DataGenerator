import { Parameter, DataType } from '../interfaces/parameter';

export abstract class Random {

  protected evaluated: boolean = false;
  protected value: Object = 'none';

  constructor(
    protected name: string,
    protected description: string
  ) {
  }

  public reset(): void {
    this.evaluated = false;
    this.value = 'none';
  }

  protected setValue(value: Object): Object {
    this.evaluated = true;
    this.value = value;
    return value;
  }

  public abstract evaluate(): Object;
  public abstract settings(): Array<Parameter>;

}
