export enum DataType {number, Random}

export interface Parameter {
  name: string,
  type: DataType,
  description: string,
  default: Object
}
