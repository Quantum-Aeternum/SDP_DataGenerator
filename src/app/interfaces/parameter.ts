export enum DataType {number, string, Random, RandomNumber, NumberManipulator, RandomString, RandomChoice, Format}

export interface Parameter {
  name: string,
  type: DataType,
  list: boolean,
  description: string,
  default: Object
}
