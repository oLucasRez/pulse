import { circle, vector } from '@types';

import { round } from '..';

export function Circle(c: vector, r: number): circle {
  return Object.freeze({
    c,
    r,
    toString(precision: number = 4) {
      return `(${c.toString(precision)},${round(r, precision)})`;
    },
  });
}

Object.freeze(Circle);
