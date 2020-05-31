import { RandomString } from './random-string';
import { RandomNumber } from '../numbers/random-number';

describe('RandomString', () => {
  it('should create an instance', () => {
    expect(new RandomString([''], new RandomNumber(1,1,1), '')).toBeTruthy();
  });
});
