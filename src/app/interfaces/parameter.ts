export class Parameter {
  constructor(
    public name: string,
    public type: DataType,
    public list: boolean,
    public description: string,
    public value: Object
  ) {}
}

export enum DataType {
  number='number',
  string='string',
  Random='Random',
  RandomNumber='RandomNumber',
  NumberManipulator='NumberManipulator',
  RandomString='RandomString',
  RandomChoice='RandomChoice',
  Format='Format'
}
