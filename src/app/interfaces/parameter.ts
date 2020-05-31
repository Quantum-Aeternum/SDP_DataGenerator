export enum DataType {number, string, Random, RandomNumber, RandomString, RandomChoice, Format}

export interface Parameter {
  name: string,
  type: DataType,
  list: boolean,
  description: string,
  default: Object
}
