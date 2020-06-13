import { Parameter, DataType } from '../interfaces/parameter';
import { Column } from '../models/column';

export abstract class Random {

  public owner: Column | undefined;

  protected evaluated: boolean = false;
  protected value: Object = 'none';
  private _nestedRandoms: Array<Random> = [];

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

  protected registerChildRandom(random: Random): void {
    this._nestedRandoms.push(random);
  }

  public settings(): Array<Parameter> {
    return [];
  }

  public getName(column?: Column): string {
    return 'Random'
  }

  public getDescription(): string {
    return 'Base class of all Randoms'
  }

  public getDisplayName(column?: Column): string {

    if (this.owner == undefined || this.owner == column)
    {
      return this.getName(column);
    }
    else
    {
      if (this.owner.isReadonly()) return this.owner.getName();
      else return this.owner.getFullname();
    }
  }

  public owners(): Array<Column>
  {
    let ownerList: Array<Column> = [];
    if (this.owner != undefined) ownerList.push(this.owner);
    this._nestedRandoms.forEach(child => {
      let childOwners = child.owners();
      childOwners.forEach(childOwner => {
        if (!ownerList.includes(childOwner)) ownerList.push(childOwner)
      });
    });
    return ownerList;
  }

  public abstract evaluate(): Object;

}
