export enum DataType {number}

export interface Parameter {
  name: string,
  type: DataType,
  description: string,
  default: Object
}
