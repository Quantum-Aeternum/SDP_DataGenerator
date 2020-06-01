import { Parameter, DataType } from '../interfaces/parameter';

export abstract class Random {

  protected evaluated: boolean = false;
  protected value: Object = 'none';

  constructor() {
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

  public static settings(): Array<Parameter> {
    return [];
  }

  public static getName(): string {
    return 'Random'
  }

  public static getDescription(): string {
    return 'Base class of all Randoms'
  }

}
