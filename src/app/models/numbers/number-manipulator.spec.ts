import { NumberManipulator } from './number-manipulator';
import { RandomNumber } from './random-number';

describe('NumberManipulator', () => {
  it('should create an instance', () => {
    expect(new NumberManipulator(new RandomNumber(1,1,1), new RandomNumber(1,1,1))).toBeTruthy();
  });
});
