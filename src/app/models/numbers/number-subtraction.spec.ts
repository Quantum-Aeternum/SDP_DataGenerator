import { NumberSubtraction } from './number-subtraction';
import { RandomNumber } from './random-number';
import { FixedNumber } from './fixed-number';

describe('NumberSubtraction', () => {
  it('should create an instance', () => {
    expect(new NumberSubtraction(new RandomNumber(1,1,1), new RandomNumber(1,1,1))).toBeTruthy();
  });

  it('should be able to subtract two numbers', () => {
    const num: NumberSubtraction = new NumberSubtraction(new FixedNumber(5), new FixedNumber(2));
    expect(num.evaluate()).toBe(3);
  });
});
