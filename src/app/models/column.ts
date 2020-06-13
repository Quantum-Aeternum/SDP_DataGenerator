import { Random } from '../models/random';
import { Table } from './table';

export class Column {

  protected references: number = 0;

  constructor(
    protected table: Table,
    protected name: string,
    protected value: Random,
    protected readonly: boolean = false,
  )
  {
    if (value.owner == undefined) value.owner = this;
  }

  public getTable(): Table {
    return this.table;
  }

  public getName(): string {
    return this.name
  }

  public getFullname(): string {
    return `${this.table.getName()}.${this.name}`;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  public getValue(): Random {
    return this.value;
  }

  public changeValue(newValue: Random): void {
    if (this.value.owner == this) this.value.owner = undefined;
    if (newValue.owner == undefined) newValue.owner = this;
    this.value = newValue;
  }

  public isReadonly(): Boolean {
    return this.readonly
  }

  public getReferenceCount(): number {
    return this.references;
  }

  public addReference(): void {
    this.references += 1;
  }

  public removeReference(): void {
    this.references -= 1;
  }
}
