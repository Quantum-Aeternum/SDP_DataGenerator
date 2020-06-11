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

  public settings(): Array<Parameter> {
    return [];
  }

  public getName(): string {
    return 'Random'
  }

  public getDescription(): string {
    return 'Base class of all Randoms'
  }

}
