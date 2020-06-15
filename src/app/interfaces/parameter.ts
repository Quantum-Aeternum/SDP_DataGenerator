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
  RandomNumber='Random Number',
  NumberManipulator='Number Manipulator',
  RandomString='String',
  RandomChoice='Choice',
  Format='Format',
  FixedNumber='Fixed Number',
  FloatNumber='Float',
  IntegerNumber='Integer',
  NumberAddition='Add',
  NumberSubtraction='Subtract',
  NumberMultiplication='Multiply',
  NumberDivision='Divide',
  CurrencyFormat='Currency',
  FixedString='Fixed String',
}
