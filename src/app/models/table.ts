import { Random } from './random';
import { Column } from '../interfaces/column';
import { ReturnState } from '../interfaces/return-state';
import { Row } from '../interfaces/row';
import { ContainerService } from '../services/container.service';

export class Table {

  private columns: Array<Column> = [];
  private parent: Table | undefined = undefined;
  private children: Array<Table> = [];

  constructor(
    private name: string,
    private minRows: number,
    private maxRows: number,
    private container: ContainerService
  ) {
    container.registerTableName(name);
    if (minRows > maxRows) {
      let tmp: number = minRows;
      minRows = maxRows;
      maxRows = tmp;
    }
  }

  public getName(): string {
    return this.name;
  }

  public getMinRows(): number {
    return this.minRows;
  }

  public getMaxRows(): number {
    return this.maxRows;
  }

  public setName(newName: string): ReturnState {
    let response: ReturnState = this.container.updateTableName(this.name, newName);
    if (response.success === true) this.name = newName;
    return response;
  }

  public setMinRows(min: number): void {
    this.minRows = Math.round(min);
    if (this.minRows > this.maxRows) {
      let tmp: number = this.minRows;
      this.minRows = this.maxRows;
      this.maxRows = tmp;
    }
  }

  public setMaxRows(max: number): void {
    this.maxRows = Math.round(max);
    if (this.minRows > this.maxRows) {
      let tmp: number = this.minRows;
      this.minRows = this.maxRows;
      this.maxRows = tmp;
    }
  }

  public hasParent(): boolean {
    if (this.parent) return true;
    else return false;
  }

  public addColumn(name: string, value: Random, required: boolean = false): ReturnState {
    if (name == undefined || name.trim() == '') return {success: false, message: `Column name may not be empty`};
    if (this.columns.findIndex(col => col.name == name) >= 0) return {success: false, message: `Column ${name} already exists on table ${this.name}`};
    let newCol: Column = {table: this.name, name: name, value: value, references: 0};
    let response = this.container.registerColumn(newCol);
    if (response.success) {
      this.columns.push(newCol);
      return {success: true, message: `Added column: ${name}`};
    }
    else {
      return response;
    }
  }

  public removeColumn(name: string): ReturnState {
    let index = this.columns.findIndex(col => col.name == name);
    if (index < 0) return {success: false, message: `Column ${name} does not exist in the ${this.name} table`};
    if (this.columns[index].references > 0) return {success: false, message: `Cannot remove ${name} because it still has references`};
    let response = this.container.deregisterColumn(this.columns[index]);
    if (response.success == true) {
      this.columns.splice(index, 1);
      return {success: true, message: `Removed column ${name}`};
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
    let response = this.container.deregisterTableName(child.name);
    if (response.success == true) {
      this.children.splice(childIndex, 1);
      child.parent = undefined;
      return {success: true, message: `Removed child table: ${child.name}`};
    }
    else {
      return response;
    }
  }

  public logicallyDelete(): ReturnState {

    // Recursively delete all children
    this.children.forEach(child => {
      child.logicallyDelete()
    });

    // Attempt to remove all columns
    for (let index = 0; index < this.columns.length; index++) {
      let col: Column = this.columns[index];
      if (col.references > 0) {
        return {success: false, message: `${col.table}.${col.name} still has references`}
      }
    }
    while (this.columns.length > 0) {
      let response = this.removeColumn(this.columns[0].name);
      if (response.success == false) return response;
    }

    // Finally remove this table from its parent
    if (this.parent === undefined) return {success: true, message: `Removed table: ${this.name}`};
    return this.parent.removeChild(this);
  }

  public generateData(): Array<Object> {
    let data: Array<Object> = [];
    let numRows = Math.floor((Math.random() * (this.maxRows - this.minRows)) + this.minRows);
    for (let index = 0; index < numRows; index++) {
      data.push(this.generateRow(index));
    }
    return data;
  }

  private generateRow(id: number): Row {

    // Create the row
    let row: Row = {id: id};
    this.columns.forEach(col => {
      row[col.name] = col.value.evaluate();
    });
    this.children.forEach(child => {
      row[child.name] = child.generateData();
    });

    // Reset the columns after creating the row (and its children)
    this.columns.forEach(col => {
      col.value.reset();
    });

    return row;
  }
}
