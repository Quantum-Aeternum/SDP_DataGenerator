import { Injectable } from '@angular/core';
import { ReturnState } from '../interfaces/return-state';
import { Column } from '../interfaces/column';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private tableNames: Array<string> = [];
  private allColumns: Array<Column> = [];

  constructor() { }

  public isTableNameAvailable(nameToCheck: string): boolean {
    return !this.tableNames.includes(nameToCheck);
  }

  public registerTableName(tableName: string): ReturnState {
    if (this.isTableNameAvailable(tableName)) {
      this.tableNames.push(tableName);
      return {success: true, message: `Table ${tableName} has been registered`}
    }
    else {
      return {success: false, message: `Table name already used: ${tableName}`}
    }
  }

  public deregisterTableName(tableName: string): ReturnState {
    let index: number = this.tableNames.indexOf(tableName);
    if (index < 0) {
      return {success: false, message: `Table ${tableName} could not be found`}
    }
    else {
      this.tableNames.splice(index, 1);
      return {success: true, message: `Deregistered table ${tableName}`};
    }
  }

  public updateTableName(oldName: string, newName: string): ReturnState {
    if (!this.isTableNameAvailable(newName)) return {success: false, message: `Table name already used: ${newName}`}
    let index: number = this.tableNames.indexOf(oldName);
    if (index < 0) {
      return {success: false, message: `Table ${oldName} could not be found`}
    }
    else {
      this.tableNames[index] = newName;
      return {success: true, message: `Changed table name from ${oldName} to ${newName}`};
    }
  }

  public isColumnNameAvailable(tableName: string, colNameToCheck: string): boolean {
    return (this.allColumns.findIndex(col => col.table == tableName && col.name == colNameToCheck) < 0)
  }

  public registerColumn(column: Column): ReturnState {
    if (!this.tableNames.includes(column.table)) return {success: false, message: `Table not found: ${column.table}`};
    if (this.isColumnNameAvailable(column.table, column.name)) {
      column.references = 0;
      this.allColumns.push(column);
      return {success: true, message: `Column ${column.name} has been registered`}
    }
    else {
      return {success: false, message: `Column name already used for table: ${column.table}.${column.name}`}
    }
  }

  public deregisterColumn(column: Column): ReturnState {
    let index: number = this.allColumns.indexOf(column);
    if (index < 0) {
      return {success: false, message: `${column.table}.${column.name} could not be found`}
    }
    else if (column.references > 0) {
      return {success: false, message: `Cannot deregister ${column.name} because it still has references`};
    }
    else {
      this.allColumns.splice(index, 1);
      return {success: true, message: `Deregistered column ${column.name}`};
    }
  }

  public updateColumnName(tableName: string, oldColName: string, newColName: string): ReturnState {
    if (!this.isColumnNameAvailable(tableName, newColName)) return {success: false, message: `Column name already used for table: ${tableName}.${newColName}`}
    let index: number = this.allColumns.findIndex(col => col.table == tableName && col.name == oldColName);
    if (index < 0) {
      return {success: false, message: `Column ${oldColName} could not be found`}
    }
    else {
      this.allColumns[index].name = newColName;
      return {success: true, message: `Changed column name from ${oldColName} to ${newColName}`};
    }
  }

  public addColumnReference(tableName: string, colName: string): ReturnState {
    let index: number = this.allColumns.findIndex(col => col.table == tableName && col.name == colName);
    if (index < 0) {
      return {success: false, message: `${tableName}.${colName} could not be found`}
    }
    else {
      this.allColumns[index].references += 1;
      return {success: true, message: `Added reference to column ${tableName}.${colName}`};
    }
  }

  public removeColumnReference(tableName: string, colName: string): ReturnState {
    let index: number = this.allColumns.findIndex(col => col.table == tableName && col.name == colName);
    if (index < 0) {
      return {success: false, message: `${tableName}.${colName} could not be found`}
    }
    else if (this.allColumns[index].references < 0) {
      this.allColumns[index].references -= 1;
      return {success: true, message: `Removed reference from column ${tableName}.${colName}`};
    }
    else {
      return {success: false, message: `${tableName}.${colName} already had 0 references`}
    }
  }
}
