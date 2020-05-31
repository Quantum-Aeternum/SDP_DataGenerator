import { IntegerNumber } from './integer-number';

describe('IntegerNumber', () => {
  it('should create an instance', () => {
    expect(new IntegerNumber(1,1,1)).toBeTruthy();
  });

  it('should evalaute to a random value between min and max (0, 100, 1)', () => {
    let success = true;
    let rnd: IntegerNumber = new IntegerNumber(0, 100, 1 );
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
      let rnd: IntegerNumber = new IntegerNumber(0, 100, step);
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

  it('should round float values (2.5-7.5, 2.5-7.5, 1)', () => {
    let success = true;
    let rnd: IntegerNumber = new IntegerNumber(2.5, 2.5, 1);
    expect(rnd.evaluate()).toBe(3);
    rnd = new IntegerNumber(5.2, 5.2, 1);
    expect(rnd.evaluate()).toBe(5);
    rnd = new IntegerNumber(7.5, 7.5, 1);
    expect(rnd.evaluate()).toBe(8);
  });
});
