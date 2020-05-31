import { NumberDivision } from './number-division';
import { RandomNumber } from './random-number';
import { FixedNumber } from './fixed-number';

describe('NumberDivision', () => {
  it('should create an instance', () => {
    expect(new NumberDivision(new RandomNumber(1,1,1), new RandomNumber(1,1,1))).toBeTruthy();
  });

  it('should be able to divide two numbers', () => {
    const num: NumberDivision = new NumberDivision(new FixedNumber(5), new FixedNumber(2));
    expect(num.evaluate()).toBe(2.5);
  });

  it('should return 0 on divide by 0 to prevent other functions from breaking', () => {
    const num: NumberDivision = new NumberDivision(new FixedNumber(5), new FixedNumber(0));
    expect(num.evaluate()).toBe(0);
  });
});
