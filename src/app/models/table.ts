import { Random } from './random';
import { Column } from '../interfaces/column';
import { ReturnState } from '../interfaces/return-state';
import { Row } from '../interfaces/row';

export class Table {

  private columns: Array<Column> = [];
  private parents: Array<Table> = [];
  private children: Array<Table> = [];

  constructor(
    private name: string,
    private minRows: number,
    private maxRows: number
  ) {

  }

  public addColumn(name: string, value: Random, required: boolean = false): ReturnState {
    if (name.trim() == '') return {success: false, message: 'Column name may not be empty'};
    if (this.columns.findIndex(col => col.name == name) >= 0) return {success: false, message: 'Column with same name already exists'};
    this.columns.push({name, value, required});
    return {success: true, message: 'Added column'};
  }

  public removeColumn(name: string): ReturnState {
    let index = this.columns.findIndex(col => col.name == name);
    if (index < 0) return {success: false, message: 'Column with that name does not exist in this table'};
    this.columns.splice(index, 1);
    return {success: true, message: 'Removed column'};
  }

  public getColumnNames(): Array<string> {
    let names: Array<string> = [];
    this.columns.forEach(col => {
      names.push(col.name)
    });
    return names;
  }

  public addChild(child: Table): ReturnState {
    if (this.children.findIndex(table => table.name == child.name) >= 0) return {success: false, message: 'Cannot add a table to itself'};
    this.children.push(child);
    child.parents.push(this);
    return {success: true, message: 'Added child table'};
  }

  public removeChild(child: Table): ReturnState {
    let childIndex = this.children.findIndex(table => table.name == child.name);
    let parentIndex = child.parents.findIndex(table => table.name == this.name);
    if (childIndex < 0 || parentIndex < 0) return {success: false, message: 'Table is not a child of the parent table'};
    this.children.splice(childIndex, 1);
    child.parents.splice(parentIndex, 1);
    return {success: true, message: 'Removed child table'};
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
