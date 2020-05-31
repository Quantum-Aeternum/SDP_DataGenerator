import { CurrencyFormat } from './currency-format';
import { FixedNumber } from '../numbers/fixed-number';

describe('CurrencyFormat', () => {
  it('should create an instance', () => {
    expect(new CurrencyFormat('R', new FixedNumber(1))).toBeTruthy();
  });

  it('should add the currency symbol to the front', () => {
    const format: CurrencyFormat = new CurrencyFormat('R', new FixedNumber(1));
    expect(format.evaluate()).toBe('R1.00');
  });

  it('should round to two decimal places', () => {
    let format: CurrencyFormat = new CurrencyFormat('R', new FixedNumber(0.005));
    expect(format.evaluate()).toBe('R0.01');
    format = new CurrencyFormat('R', new FixedNumber(1.5));
    expect(format.evaluate()).toBe('R1.50');
  });
});
