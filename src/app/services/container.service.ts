import { Injectable } from '@angular/core';
import { ReturnState } from '../interfaces/return-state';
import { Column } from '../models/column';
import { Table } from '../models/table';
import { Random } from 'src/app/models/random';
import { RandomNumber } from '../models/numbers/random-number';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { ColumnDialogComponent } from './column-dialog/column-dialog.component';

export interface ColumnData {
  name: string;
  value: Random;
  column?: Column;
  delete?: boolean;
}

export interface TableData {
  new: boolean;
  name: string;
  numRows: RandomNumber;
}

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private allTables: Array<Table> = [];
  private allColumns: Array<Column> = [];

  constructor(
    public dialog: MatDialog
  ) { }

  public isTableNameAvailable(nameToCheck: string): boolean {
    if (nameToCheck.trim() == '') return false;
    return (this.allTables.findIndex(table => table.getName() == nameToCheck) < 0)
  }

  public isColumnNameAvailable(table: Table, colNameToCheck: string): boolean {
    if (colNameToCheck.trim() == '') return false;
    return (this.allColumns.findIndex(col => col.getTable() == table && col.getName() == colNameToCheck) < 0)
  }

  public registerTable(table: Table): ReturnState {
    if (this.isTableNameAvailable(table.getName())) {
      this.allTables.push(table);
      let numRows: RandomNumber = table.getNumRows();
      let owner: Column | undefined = numRows.getOwner();
      if (owner != undefined) this.addColumnReference(owner);
      return {success: true, message: `Table ${table.getName()} has been registered`}
    }
    else {
      return {success: false, message: `Table name already used or invalid: ${table.getName()}`}
    }
  }

  public deregisterTable(table: Table): ReturnState {
    let index: number = this.allTables.indexOf(table);
    if (index < 0) {
      return {success: false, message: `Table ${table.getName()} could not be found`}
    }
    else {
      let numRows: RandomNumber = table.getNumRows();
      let owner: Column | undefined = numRows.getOwner();
      if (owner != undefined) this.removeColumnReference(owner);
      this.allTables.splice(index, 1);
      return {success: true, message: `Deregistered table ${table.getName()}`};
    }
  }

  public updateTableName(table: Table, newName: string): ReturnState {
    if (!this.isTableNameAvailable(newName)) return {success: false, message: `Table name already used or invalid: ${newName}`};
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
      return {success: false, message: `Column name already used for table or invalid: ${column.getFullname()}`}
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
    if (!this.isColumnNameAvailable(column.getTable(), newColName)) return {success: false, message: `Column name already used for table or invalid: ${column.getTable().getName()}.${newColName}`}
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

  public getSelectableColumns(column?: Column): Array<Column> {
    let table: Table | undefined = column? column.getTable() : undefined;
    let parentTable: Table | undefined = table? table.getParent() : undefined;
    let cols = this.allColumns.filter(col => {
      return col.getTable().getName() == "READONLY" ||
      (col != column && col.getTable() == table) ||
      (parentTable != undefined && col.getTable() == parentTable)
    });
    return cols;
  }

  public openTableDialog(data: TableData): Observable<TableData> {

    const dialogRef = this.dialog.open(TableDialogComponent, {
      data: data
    });

    return dialogRef.afterClosed();
  }

  public openColumnDialog(data: ColumnData): Observable<ColumnData> {

    const dialogRef = this.dialog.open(ColumnDialogComponent, {
      data: data
    });

    return dialogRef.afterClosed();
  }
}
