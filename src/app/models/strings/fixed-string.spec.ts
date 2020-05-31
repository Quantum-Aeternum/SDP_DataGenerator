import { FixedString } from './fixed-string';

describe('FixedString', () => {
  it('should create an instance', () => {
    expect(new FixedString('test')).toBeTruthy();
  });

  it('should evaluate to the input string', () => {
    const str = new FixedString('test');
    expect(str.evaluate()).toBe('test');
  });

  it('should always evaluate to the same string', () => {
    const str = new FixedString('test');
    expect(str.evaluate()).toBe('test');
    expect(str.evaluate()).toBe('test');
    str.reset();
    expect(str.evaluate()).toBe('test');
  });
});
