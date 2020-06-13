import { Random } from '../random';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { RandomNumber } from '../numbers/random-number';

export abstract class Format extends Random{

  constructor(
    protected format: string = '',
    protected obj: Random = new RandomNumber()
  ) {
    super();
    this.registerChildRandom(obj);
  }

  public getName(tableName?: string, colName?: string): string {
    if (tableName != undefined && colName != undefined) {
      return `Format[${this.format}, ${this.obj.getDisplayName(tableName, colName)}]`
    }
    else {
      return 'Format'
    }
  }

  public getDescription(): string {
    return 'Formats a random value'
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'format', type: DataType.string, list: false, description: 'Format', default: this.format},
      { name: 'obj', type: DataType.Random, list: false, description: 'Any random value', default: new RandomNumber()}
    ];
  }

  public abstract evaluate(): Object;

  public reset(): void {
    super.reset();
    this.obj.reset();
  }
}
