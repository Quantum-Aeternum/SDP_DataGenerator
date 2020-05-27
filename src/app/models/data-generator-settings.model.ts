import { DataType } from "./data-type.model";
import { DataType_Integer, DataType_Float } from './data-types/all-data-types.ref';

export enum Table { Group, Demand, Allocation, Supply}

export interface Column {
  name: string,
  type: DataType,
  required?: boolean
}

export class DataGeneratorSettings {

  private orderSettings : Array<Column> = [];
  private demandSettings : Array<Column> = [];
  private allocationSettings : Array<Column> = [];
  private supplySettings : Array<Column> = [];

  constructor() {

    this.addRequiredColumn(Table.Group, 'Count', new DataType_Integer(5, 10, 1))
    this.addRequiredColumn(Table.Group, 'MinSize', new DataType_Integer(10, 20, 5))
    this.addRequiredColumn(Table.Group, 'MaxSize', new DataType_Integer(20, 40, 5))

    this.addRequiredColumn(Table.Group, 'Count', new DataType_Integer(1, 5, 1))
    this.addRequiredColumn(Table.Demand, 'Min', new DataType_Integer(0, 4, 2))
    this.addRequiredColumn(Table.Demand, 'Ideal', new DataType_Integer(4, 10, 2))
    this.addRequiredColumn(Table.Demand, 'Max', new DataType_Integer(10, 20, 2))

    this.addRequiredColumn(Table.Allocation, 'Count', new DataType_Integer(1, 1, 1))
    this.addRequiredColumn(Table.Allocation, 'Allocated', new DataType_Integer(0, 10, 1))

    this.addRequiredColumn(Table.Supply, 'Count', new DataType_Integer(50, 60, 1))
    this.addRequiredColumn(Table.Supply, 'Stock', new DataType_Integer(0, 200, 1))

    console.log(this.orderSettings);
    console.log(this.demandSettings);
    console.log(this.allocationSettings);
    console.log(this.supplySettings);
  }

  private settings(table: Table): Array<Column> {
    switch (table) {
      case Table.Group:
        return this.orderSettings;
      case Table.Demand:
        return this.demandSettings;
      case Table.Allocation:
        return this.allocationSettings;
      case Table.Supply:
        return this.supplySettings;
      default:
        return [];
    }
  }

  private addRequiredColumn(table: Table, colName: string, colType: DataType): Column {
    let col: Column = this.addColumn(table, colName, colType);
    this.settings(table).indexOf(col);
    col.required = true;
    return col;
  }

  public addColumn(table: Table, colName: string, colType: DataType): Column {
    let col: Column = {'name': colName, 'type': colType};
    this.settings(table).push(col);
    return col;
  }

  public removeColumn(table: Table, colName: string): boolean {
    let index: number = this.settings(table).findIndex((val) => val.name === colName);
    if (index < 0) {
      return false;
    }
    else if (this.settings(table)[index].required === true) {
      return false;
    }
    else {
      this.settings(table).splice(index, 1)
      return true;
    }
  }
}
