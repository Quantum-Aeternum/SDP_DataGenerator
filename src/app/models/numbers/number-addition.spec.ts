import { NumberAddition } from './number-addition';
import { RandomNumber } from './random-number';
import { FixedNumber } from './fixed-number';

describe('NumberAddition', () => {
  it('should create an instance', () => {
    expect(new NumberAddition(new RandomNumber(1,1,1), new RandomNumber(1,1,1))).toBeTruthy();
  });

  it('should be able to add two numbers', () => {
    const num: NumberAddition = new NumberAddition(new FixedNumber(1), new FixedNumber(1));
    expect(num.evaluate()).toBe(2);
  });
});
