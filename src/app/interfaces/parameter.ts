export enum DataType {number, string, Random, RandomNumber, NumberManipulator, RandomString, RandomChoice, Format}

export class Parameter {
  constructor(
    public name: string,
    public type: DataType,
    public list: boolean,
    public description: string,
    public value: Object
  ) {}
}
