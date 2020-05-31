import { FixedNumber } from './fixed-number';

describe('FixedNumber', () => {
  it('should create an instance', () => {
    expect(new FixedNumber(1)).toBeTruthy();
  });

  it('should always produce the same value', () => {
    const num: FixedNumber = new FixedNumber(1);
    expect(num.evaluate()).toBe(1);
    expect(num.evaluate()).toBe(1);
    num.reset();
    expect(num.evaluate()).toBe(1);
    num.reset();
    expect(num.evaluate()).toBe(1);
  });
});
