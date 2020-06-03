import { Random } from './random';
import { Column } from '../interfaces/column';
import { ReturnState } from '../interfaces/return-state';
import { Row } from '../interfaces/row';

export class Table {

  private columns: Array<Column> = [];
  private parent: Table | undefined = undefined;
  private children: Array<Table> = [];

  constructor(
    private name: string,
    private minRows: number,
    private maxRows: number
  ) {

  }

  public getName(): string {
    return this.name;
  }

  public hasParent(): boolean {
    if (this.parent) return true;
    else return false;
  }

  public getColumnNames(): Array<string> {
    let names: Array<string> = [];
    this.columns.forEach(col => {
      names.push(col.name)
    });
    return names;
  }

  public addColumn(name: string, value: Random, required: boolean = false): ReturnState {
    if (name.trim() == '') return {success: false, message: `Column name may not be empty`};
    if (this.columns.findIndex(col => col.name == name) >= 0) return {success: false, message: `Column ${name} already exists on table ${this.name}`};
    this.columns.push({name, value, required});
    return {success: true, message: `Added column: ${name}`};
  }

  public removeColumn(name: string): ReturnState {
    let index = this.columns.findIndex(col => col.name == name);
    if (index < 0) return {success: false, message: `Column ${name} does not exist in the ${this.name} table`};
    this.columns.splice(index, 1);
    return {success: true, message: `Removed column ${name}`};
  }

  public addChild(child: Table): ReturnState {
    if (child.name.trim() == '') return {success: false, message: `Cannot add a table with a blank name`};
    if (child.name == this.name) return {success: false, message: `Cannot add a table to itself`};
    if (this.children.findIndex(table => table.name == child.name) >= 0) return {success: false, message: `${this.name} already contains ${child.name}`};
    this.children.push(child);
    child.parent = this;
    return {success: true, message: `Added ${child.name} to ${this.name}`};
  }

  public removeChild(child: Table): ReturnState {
    let childIndex = this.children.findIndex(table => table.name == child.name);
    if (childIndex < 0 || this.children[childIndex].parent != this) return {success: false, message: `Table ${child.name} is not a child of the ${this.name} table`};
    this.children.splice(childIndex, 1);
    child.parent = undefined;
    return {success: true, message: `Removed child table: ${child.name}`};
  }

  public logicallyDelete(): ReturnState {
    this.children.forEach(child => {
      child.logicallyDelete()
    });
    if (this.parent === undefined) return {success: false, message: `Removed table: ${this.name}`};
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
