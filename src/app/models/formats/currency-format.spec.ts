import { CurrencyFormat } from './currency-format';
import { RandomNumber } from '../numbers/random-number';

describe('CurrencyFormat', () => {
  it('should create an instance', () => {
    expect(new CurrencyFormat('R', new RandomNumber(1,1,1))).toBeTruthy();
  });
});
