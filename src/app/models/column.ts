import { Random } from '../models/random';
import { Table } from './table';
import { ContainerService } from '../services/container.service';

export class Column {

  protected references: number = 0;

  constructor(
    protected table: Table,
    protected name: string,
    protected value: Random,
    protected readonly: boolean = false,
    private container: ContainerService
  )
  {
    if (value.getOwner() == undefined) value.setOwner(this);
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

  public changeValue(newValue: Random): boolean {
    if (this.getReferenceCount() > 0) return false;
    let oldOwner = this.value.getOwner();
    if (oldOwner && this.value != newValue) {
      if (oldOwner != this) this.container.removeColumnReference(oldOwner);
    }
    this.value = newValue;
    this.value.setOwner(newValue.getOwner());
    return true;
  }

  public updateValue(newValue: Random): void {
    this.value.update(newValue.settings());
    this.value.setOwner(newValue.getOwner());
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
