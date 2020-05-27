import { DataType, TypeSettings } from '../data-type.model';

export class DataType_Float extends DataType {

  constructor(private min: number, private max: number) {
    super("Float");
  }

  public evaluate(): number {
    return 1;
  }

  public typeSettings(): Array<TypeSettings> {
    return [
      {name: 'min', type: 'number', default: 0},
      {name: 'max', type: 'number', default: 10},
    ];
  }
}
