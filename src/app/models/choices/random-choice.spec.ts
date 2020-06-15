import { RandomChoice } from './random-choice';
import { RandomNumber } from '../numbers/random-number';
import { IntegerNumber } from '../numbers/integer-number';

describe('RandomChoice', () => {
  it('should create an instance', () => {
    expect(new RandomChoice([new IntegerNumber(1,1,1)])).toBeTruthy();
  });
});
