import { Parameter, DataType } from '../interfaces/parameter';
import { Column } from '../interfaces/column';

export abstract class Random {

  public owner: Column | undefined;

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

  public getName(includeAll: boolean = false): string {
    return 'Random'
  }

  public getDescription(): string {
    return 'Base class of all Randoms'
  }

  public getDisplayName(tableName: string, colName: string): string {
    if (this.owner != undefined && this.owner.readonly != undefined && this.owner.readonly == true){
      return `${this.owner.name}`;
    }
    else if (this.owner != undefined && (this.owner.table != tableName || this.owner.name != colName))
    {
      return `${this.owner.table}.${this.owner.name}`;
    }
    else {
      return this.getName(true);
    }
  }

}
