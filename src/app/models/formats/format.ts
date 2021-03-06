import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { RandomNumber } from '../numbers/random-number';
import { Column } from '../column';
import { IntegerNumber } from '../numbers/integer-number';

export abstract class Format extends Random{

  constructor(
    protected format: string = '',
    protected obj: Random = new IntegerNumber()
  ) {
    super();
    this.registerChildRandom(obj);
  }

  public getDescription(): string {
    return 'Formats a random value'
  }

  public getType(): DataType {
    return DataType.Format;
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'format', type: DataType.string, list: false, description: 'Format', value: this.format},
      { name: 'obj', type: DataType.Random, list: false, description: 'Any random value', value: this.obj}
    ];
  }

  public update(parameters: Parameter[]): void {
    this.format = <string>parameters[0].value;
    this.obj = <Random>parameters[1].value;
  }

  public abstract evaluate(): Object;

  public reset(): void {
    super.reset();
    this.obj.reset();
  }
}
