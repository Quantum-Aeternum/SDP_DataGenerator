export interface TypeSettings {
  name: string,
  type: string,
  default: Object
}

export abstract class DataType {

  constructor(private name: string) {

  }

  public abstract evaluate(): number;
  public abstract typeSettings(): Array<TypeSettings>;
}
