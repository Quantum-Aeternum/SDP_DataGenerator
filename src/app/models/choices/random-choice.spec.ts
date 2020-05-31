import { RandomChoice } from './random-choice';
import { RandomNumber } from '../numbers/random-number';

describe('RandomChoice', () => {
  it('should create an instance', () => {
    expect(new RandomChoice([new RandomNumber(1,1,1)])).toBeTruthy();
  });
});
