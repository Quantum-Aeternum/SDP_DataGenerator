import { FloatNumber } from './float-number';

describe('FloatNumber', () => {
  it('should create an instance', () => {
    expect(new FloatNumber(0, 100, 1, 2)).toBeTruthy();
  });

  it('should respect float numbers (2.5, 7.5, 1.5)', () => {
    let success = true;
    let rnd: FloatNumber = new FloatNumber(2.5, 50.5, 1.5, 2);
    for (let index = 0; index < 100; index++) {
      rnd.reset();
      let val = rnd.evaluate();
      if (val < 2.5 || val > 50.5) {
        success = false;
        break;
      }
    }
    expect(success).toBe(true);
  });

  it('should respect float step sizes (0, 100, 2.5-7.5)', () => {
    let success = true;
    for (let step = 2.5; step <= 7.5; step += 2.5) {
      let rnd: FloatNumber = new FloatNumber(0, 100, step, 2);
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

  it('should respect small float step sizes (0, 5, 0.05-0.15)', () => {
    let success = true;
    for (let step = 0.05; step <= 0.15; step += 0.05) {
      let rnd: FloatNumber = new FloatNumber(0, 5, step, 2);
      for (let index = 0; index < 5; index++) {
        rnd.reset();
        let val: number = Number(rnd.evaluate());
        let check: number = 1 - ((val / step) % 1);
        if (val < 0 || val > 5 || (check < 1 && check > 0.000001)) {
          success = false;
          break;
        }
      }
      if (success === false) break;
    }
    expect(success).toBe(true);
  });
});
