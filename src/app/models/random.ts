import { Parameter, DataType } from '../interfaces/parameter';
import { Column } from '../models/column';

export abstract class Random {

  protected owner: Column | undefined;

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

  public getOwner(): Column | undefined {
    return this.owner;
  }

  public setOwner(column: Column | undefined) {
    if (this.owner == undefined) this.owner = column;
    this._nestedRandoms.forEach(random => {
      random.setOwner(column);
    });
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

  public updateReferences(column: Column): void {
    this._nestedRandoms.forEach(random => {
      if (random.owner == column) random.update(column.getValue().settings());
      else random.updateReferences(column);
    });
  }

  public getName(column?: Column): string {
    let childrenNames: Array<string> = [];
    this.settings().forEach(setting => {
      if (setting.type == DataType.number || setting.type == DataType.string) {
        childrenNames.push(setting.value.toString());
      }
      else {
        if (setting.list) {
          childrenNames.push((<Array<Random>>setting.value).map(val => val.getName(column)).join(','))
        }
        else {
          childrenNames.push((<Random>setting.value).getDisplayName(column));
        }
      }
    });
    return `${this.getType()}[${childrenNames.join(',')}]`
  }

  public abstract getDescription(): string;
  public abstract getType(): DataType;
  public abstract evaluate(): Object;
  public abstract settings(): Array<Parameter>;
  public abstract update(parameters: Array<Parameter>): void;
  public abstract clone(): Random;

}
