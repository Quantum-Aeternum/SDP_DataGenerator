import { RandomNumber } from './random-number';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Column } from '../column';
import { Random } from '../random';
import { IntegerNumber } from './integer-number';

export class RoundNumber extends RandomNumber{
  constructor(
    protected num: RandomNumber = new IntegerNumber()
  ){
    super(1, 1, 1);
    this.registerChildRandom(num);
  }

  public clone(): Random {
    let clone: RoundNumber = new RoundNumber(<RandomNumber>this.num.clone());
    clone.owner = this.owner;
    return clone;
  }

  public getDescription(): string {
    return 'Allow RandomNumbers to be rounded'
  }

  public getType(): DataType {
    return DataType.RoundNumber;
  }

  public settings(): Array<Parameter> {
    return [
      { name: 'Number', type: DataType.RandomNumber, list: false, description: 'Number to round', value: this.num}
    ];
  }

  public update(parameters: Parameter[]): void {
    this.num = <RandomNumber>parameters[0].value;
  }

  public evaluate(): Object {
    // Check if the object has already been set
    if (this.evaluated == true) return this.value;
    return this.setValue(Math.round(<number>this.num.evaluate()));
  }

  public reset(): void {
    super.reset();
    this.num.reset();
  }
}
