import { NumberMultiplication } from './number-multiplication';
import { RandomNumber } from './random-number';
import { FixedNumber } from './fixed-number';

describe('NumberMultiplication', () => {
  it('should create an instance', () => {
    expect(new NumberMultiplication(new RandomNumber(1,1,1), new RandomNumber(1,1,1))).toBeTruthy();
  });

  it('should be able to multiply two numbers', () => {
    const num: NumberMultiplication = new NumberMultiplication(new FixedNumber(5), new FixedNumber(2));
    expect(num.evaluate()).toBe(10);
  });
});
