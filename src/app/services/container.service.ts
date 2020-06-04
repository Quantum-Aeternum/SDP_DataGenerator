import { Injectable } from '@angular/core';
import { ReturnState } from '../interfaces/return-state';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private tableNames: Array<string> = [];

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
}
