import { RandomNumber } from './random-number';
import { Random } from '../random';

describe('RandomNumber', () => {

  it('should create an instance', () => {
    expect(new RandomNumber(0, 100, 1)).toBeTruthy();
  });

  it('should evalaute to a random value between min and max (0, 100, 1)', () => {
    let success = true;
    let rnd: Random = new RandomNumber(0, 100, 1 );
    for (let index = 0; index < 100; index++) {
      rnd.reset();
      let val = rnd.evaluate();
      if (val < 0 || val > 100) {
        success = false;
        break;
      }
    }
    expect(success).toBe(true);
  });

  it('should respect integer step sizes (0, 100, 2-10)', () => {
    let success = true;
    for (let step = 2; step <= 10; step++) {
      let rnd: Random = new RandomNumber(0, 100, step);
      for (let index = 0; index < 100; index++) {
        rnd.reset();
        let val: number = Number(rnd.evaluate());
        if (val > 100)
        {
          expect(val).toBeFalsy();
          expect(step).toBeFalsy();
          expect(100 / step).toBeFalsy();
        }
        if (val < 0 || val > 100 || val % step != 0) {
          success = false;
          break;
        }
      }
      if (success === false) break;
    }
    expect(success).toBe(true);
  });

  it('should respect float step sizes (0, 100, 2.5-7.5)', () => {
    let success = true;
    for (let step = 2.5; step <= 7.5; step += 2.5) {
      let rnd: Random = new RandomNumber(0, 100, step);
      for (let index = 0; index < 100; index++) {
        rnd.reset();
        let val: number = Number(rnd.evaluate());
        if (val < 0 || val > 100 || val % step != 0) {
          success = false;
          break;
        }
      }
      if (success === false) break;
    }
    expect(success).toBe(true);
  });
});
