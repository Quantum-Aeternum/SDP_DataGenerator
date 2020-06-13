import { Random } from './random';
import { ReturnState } from '../interfaces/return-state';
import { Row } from '../interfaces/row';
import { ContainerService } from '../services/container.service';
import { RandomNumber } from './numbers/random-number';
import { Column } from './column';

export class Table {

  private logicallyDeleted: boolean = false;
  protected columns: Array<Column> = [];
  protected parent: Table | undefined = undefined;
  protected children: Array<Table> = [];

  constructor(
    protected name: string,
    protected numRows: RandomNumber = new RandomNumber(),
    protected container: ContainerService
  ) {
    container.registerTable(this);
  }

  public getName(): string {
    return this.name;
  }

  public getNumRows(): RandomNumber {
    return this.numRows;
  }

  public getColumnNames(): Array<string> {
    return this.columns.map(c => c.getName());
  }

  public setName(newName: string): ReturnState {
    let response: ReturnState = this.container.updateTableName(this, newName);
    if (response.success === true) this.name = newName;
    return response;
  }

  public setNumRows(numRows: RandomNumber): void {
    this.numRows = numRows;
  }

  public hasParent(): boolean {
    if (this.parent) return true;
    else return false;
  }

  public shouldDispose(): boolean {
    return this.logicallyDeleted;
  }

  public setColumnName(column: Column, newName: string): ReturnState {
    let index = this.columns.indexOf(column);
    if (index < 0) return {success: false, message: `Column ${column.getName()} does not exist in the ${this.name} table`};
    return this.container.updateColumnName(column, newName);;
  }

  public addColumn(name: string, value: Random, readonly: boolean = false): ReturnState {
    if (name == undefined || name.trim() == '') return {success: false, message: `Column name may not be empty`};
    if (this.columns.findIndex(col => col.getName() == name) >= 0) return {success: false, message: `Column ${name} already exists on table ${this.name}`};
    let newCol: Column = new Column(this, name, value, readonly);
    let response = this.container.registerColumn(newCol);
    if (response.success) {
      newCol.getValue().owners().forEach(owner => {
        if (owner != newCol) {
          this.container.addColumnReference(owner);
        }
      });
      this.columns.push(newCol);
      return {success: true, message: `Added column: ${name}`};
    }
    else {
      return response;
    }
  }

  public removeColumn(name: string, ignoreReferences: boolean = false): ReturnState {
    let index = this.columns.findIndex(col => col.getName() == name);
    if (index < 0) return {success: false, message: `Column ${name} does not exist in the ${this.name} table`};
    let response = this.container.deregisterColumn(this.columns[index], ignoreReferences);
    if (response.success == true) {
      this.columns[index].getValue().owners().forEach(owner => {
        if (owner != this.columns[index]) {
          this.container.removeColumnReference(owner);
        }
      });
      this.columns.splice(index, 1);
      return {success: true, message: `Removed column: ${name}`};
    }
    else {
      return response;
    }
  }

  public addChild(child: Table): ReturnState {
    if (name == undefined || child.name.trim() == '') return {success: false, message: `Cannot add a table with a blank name`};
    if (child.name == this.name) return {success: false, message: `Cannot add a table to itself`};
    if (this.children.findIndex(table => table.name == child.name) >= 0) return {success: false, message: `${this.name} already contains ${child.name}`};
    this.children.push(child);
    child.parent = this;
    return {success: true, message: `Added ${child.name} to ${this.name}`};
  }

  protected removeChild(child: Table): ReturnState {
    let childIndex = this.children.findIndex(table => table.name == child.name);
    if (childIndex < 0 || this.children[childIndex].parent != this) return {success: false, message: `Table ${child.name} is not a child of the ${this.name} table`};
    this.children.splice(childIndex, 1);
    child.parent = undefined;
    return {success: true, message: `Removed child table: ${child.name}`};
  }

  public logicallyDelete(): ReturnState {

    // Recursively delete all children
    this.children.forEach(child => {
      child.logicallyDelete()
    });

    // Attempt to remove all columns
    while (this.columns.length > 0) {
      let response = this.removeColumn(this.columns[0].getName(), true);
      if (response.success == false) return response;
    }

    // Finally remove this table from its parent
    this.container.deregisterTable(this);
    this.logicallyDeleted = true;
    if (this.parent === undefined) return {success: true, message: `Removed table: ${this.name}`};
    return this.parent.removeChild(this);
  }

  public generateData(): Array<Object> {
    let data: Array<Object> = [];
    let numRows = this.numRows.evaluate();
    for (let index = 0; index < numRows; index++) {
      data.push(this.generateRow(index));
    }
    this.numRows.reset();
    return data;
  }

  private generateRow(id: number): Row {

    // Create the row
    let row: Row = {id: id};
    this.columns.forEach(col => {
      row[col.getName()] = col.getValue().evaluate();
    });
    this.children.forEach(child => {
      row[child.name] = child.generateData();
    });

    // Reset the columns after creating the row (and its children)
    this.columns.forEach(col => {
      let val: Random = col.getValue();
      if (val.owner != undefined && val.owner.isReadonly() == false) {
        val.reset();
      }
    });

    return row;
  }
}
