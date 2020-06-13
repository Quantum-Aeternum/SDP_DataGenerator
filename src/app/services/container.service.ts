import { Injectable } from '@angular/core';
import { ReturnState } from '../interfaces/return-state';
import { Column } from '../models/column';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private allTables: Array<Table> = [];
  private allColumns: Array<Column> = [];

  constructor() { }

  public isTableNameAvailable(nameToCheck: string): boolean {
    return (this.allTables.findIndex(table => table.getName() == nameToCheck) < 0)
  }

  public isColumnNameAvailable(table: Table, colNameToCheck: string): boolean {
    return (this.allColumns.findIndex(col => col.getTable() == table && col.getName() == colNameToCheck) < 0)
  }

  public registerTable(table: Table): ReturnState {
    if (this.isTableNameAvailable(table.getName())) {
      this.allTables.push(table);
      return {success: true, message: `Table ${table.getName()} has been registered`}
    }
    else {
      return {success: false, message: `Table name already used: ${table.getName()}`}
    }
  }

  public deregisterTable(table: Table): ReturnState {
    let index: number = this.allTables.indexOf(table);
    if (index < 0) {
      return {success: false, message: `Table ${table.getName()} could not be found`}
    }
    else {
      this.allTables.splice(index, 1);
      return {success: true, message: `Deregistered table ${table.getName()}`};
    }
  }

  public updateTableName(table: Table, newName: string): ReturnState {
    if (!this.isTableNameAvailable(newName)) return {success: false, message: `Table name already used: ${newName}`};
    let index: number = this.allTables.indexOf(table);
    if (index < 0) {
      return {success: false, message: `Table ${table.getName()} could not be found`}
    }
    else {
      let oldName = table.getName();
      return {success: true, message: `Changed table name from ${oldName} to ${newName}`};
    }
  }

  public registerColumn(column: Column): ReturnState {
    if (!this.allTables.includes(column.getTable())) return {success: false, message: `Table not found: ${column.getTable().getName()}`};
    if (this.isColumnNameAvailable(column.getTable(), column.getName())) {
      this.allColumns.push(column);
      return {success: true, message: `Column ${column.getName()} has been registered`}
    }
    else {
      return {success: false, message: `Column name already used for table: ${column.getTable().getName()}.${column.getName()}`}
    }
  }

  public deregisterColumn(column: Column, ingoreReferences: boolean = false): ReturnState {
    let index: number = this.allColumns.indexOf(column);
    if (index < 0) {
      return {success: false, message: `${column.getTable().getName()}.${column.getName()} could not be found`}
    }
    else if (!ingoreReferences && column.getReferenceCount() > 0) {
      if (column.getReferenceCount() == 1) return {success: false, message: `Cannot deregister ${column.getName()} because it still has 1 reference`};
      else return {success: false, message: `Cannot deregister ${column.getName()} because it still has ${column.getReferenceCount()} references`};
    }
    else {
      this.allColumns.splice(index, 1);
      return {success: true, message: `Deregistered column ${column.getName()}`};
    }
  }

  public updateColumnName(column: Column, newColName: string): ReturnState {
    if (!this.isColumnNameAvailable(column.getTable(), newColName)) return {success: false, message: `Column name already used for table: ${column.getTable().getName()}.${newColName}`}
    let index: number = this.allColumns.indexOf(column);
    if (index < 0) {
      return {success: false, message: `Column ${column.getName()} could not be found`}
    }
    else {
      let oldName: string = column.getName();
      this.allColumns[index].setName(newColName);
      return {success: true, message: `Changed column name from ${oldName} to ${newColName}`};
    }
  }

  public addColumnReference(column: Column): ReturnState {
    let index: number = this.allColumns.indexOf(column);
    if (index < 0) {
      return {success: false, message: `${column.getFullname()} could not be found`}
    }
    else {
      this.allColumns[index].addReference();
      return {success: true, message: `Added reference to column ${column.getFullname()}`};
    }
  }

  public removeColumnReference(column: Column): ReturnState {
    let index: number = this.allColumns.indexOf(column);
    if (index < 0) {
      return {success: false, message: `${column.getFullname()} could not be found`}
    }
    else if (this.allColumns[index].getReferenceCount() > 0) {
      this.allColumns[index].removeReference()
      return {success: true, message: `Removed reference from column ${column.getFullname()}`};
    }
    else {
      return {success: false, message: `${column.getFullname()} already had 0 references`}
    }
  }
}
