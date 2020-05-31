import { Random } from '../random';
import { Parameter } from 'src/app/interfaces/parameter';

export abstract class Format extends Random{

  constructor(
    protected format: string,
    protected obj: Random
  ) {
    super('Format','Formats a random value');
  }

  public abstract evaluate(): Object;
  public abstract settings(): Array<Parameter>;

  public reset(): void {
    super.reset();
    this.obj.reset();
  }
}
