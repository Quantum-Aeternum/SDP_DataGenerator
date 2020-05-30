import { Random } from './random';
import { Column } from '../interfaces/column';

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

  public addColumn(name: string, value: Random, required: boolean = false): boolean {
    if (this.columns.findIndex(col => col.name == name) >= 0) return false;
    this.columns.push({name, value, required});
    return true;
  }

  public removeColumn(name: string): boolean {
    let index = this.columns.findIndex(col => col.name == name);
    if (index < 0) return false;
    this.columns.splice(index, 1);
    return true;
  }

  public getColumnNames(): Array<string> {
    let names: Array<string> = [];
    this.columns.forEach(col => {
      names.push(col.name)
    });
    return names;
  }

  public addChild(child: Table): boolean {
    if (this.children.findIndex(table => table.name == child.name) >= 0) return false;
    this.children.push(child);
    child.parents.push(this);
    return true;
  }

  public removeChild(child: Table): boolean {
    let childIndex = this.children.findIndex(table => table.name == child.name);
    let parentIndex = child.parents.findIndex(table => table.name == this.name);
    if (childIndex < 0 || parentIndex < 0) return false;
    this.children.splice(childIndex, 1);
    child.parents.splice(parentIndex, 1);
    return true;
  }

  public generateData(): Array<Object> {
    let data: Array<Object> = [];
    let numRows = Math.floor((Math.random() * (this.maxRows - this.minRows)) + this.minRows);
    for (let index = 0; index < numRows; index++) {
      data.push(this.generateRow());
    }
    return data;
  }

  private generateRow(): Object {
    let row: {[k: string]: Object} = {};
    this.columns.forEach(col => {
      row[col.name] = col.value.evaluate()
    });
    this.children.forEach(child => {
      row[child.name] = child.generateData()
    });
    return row;
  }
}
