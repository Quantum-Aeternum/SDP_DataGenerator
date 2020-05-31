import { RandomString } from './random-string';
import { RandomNumber } from '../numbers/random-number';

describe('RandomString', () => {
  it('should create an instance', () => {
    expect(new RandomString([''], new RandomNumber(1,1,1), '')).toBeTruthy();
  });

  it('should only contain symbols from the alphabet', () => {
    const symbols: Array<string> = ['a','b','c'];
    const str: RandomString = new RandomString(symbols,new RandomNumber(1,1,1),'');
    expect(symbols).toContain(String(str.evaluate()));
  });

  it('should be able to evaluate to all of the symbols', () => {
    const symbols: Array<string> = ['a','b','c'];
    const str: RandomString = new RandomString(symbols,new RandomNumber(1,1,1),'');
    let countA = 0;
    let countB = 0;
    let countC = 0;
    for (let index = 0; index < 100; index++) {
      str.reset();
      let gen = str.evaluate();
      if (gen == 'a') ++countA;
      if (gen == 'b') ++countB;
      if (gen == 'c') ++countC;
    }
    expect(countA).toBeGreaterThan(0);
    expect(countB).toBeGreaterThan(0);
    expect(countC).toBeGreaterThan(0);
  });

  it('should use the correct seperator, without one at the end', () => {
    const symbols: Array<string> = ['a'];
    const str: RandomString = new RandomString(symbols,new RandomNumber(5,5,1),',');
    expect(str.evaluate()).toBe('a,a,a,a,a')
  });
});
