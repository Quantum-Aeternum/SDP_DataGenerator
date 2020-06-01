import { Random } from '../random';
import { Parameter } from 'src/app/interfaces/parameter';

export abstract class Format extends Random{

  constructor(
    protected format: string,
    protected obj: Random
  ) {
    super();
  }

  public static getName(): string {
    return 'Format'
  }

  public static getDescription(): string {
    return 'Formats a random value'
  }

  public abstract evaluate(): Object;

  public reset(): void {
    super.reset();
    this.obj.reset();
  }
}
