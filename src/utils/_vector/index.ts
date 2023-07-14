import { vector } from '@types';

import { round } from '..';

function mag(u: vector): number {
  return Math.sqrt(Math.pow(u.x, 2) + Math.pow(u.y, 2));
}

function add(u: vector, v: vector): vector {
  return Vector(u.x + v.x, u.y + v.y);
}

function sub(u: vector, v: vector): vector {
  return Vector(u.x - v.x, u.y - v.y);
}

function mult(u: vector, a: number): vector {
  return Vector(u.x * a, u.y * a);
}

function div(u: vector, a: number): vector {
  return Vector(u.x / a, u.y / a);
}

export function Vector(x: number, y: number): vector {
  return {
    x,
    y,
    mag() {
      return mag(Vector(x, y));
    },
    '+'(u: vector) {
      return add(Vector(x, y), u);
    },
    '-'(u: vector) {
      return sub(Vector(x, y), u);
    },
    '*'(a: number) {
      return mult(Vector(x, y), a);
    },
    '/'(a: number) {
      return div(Vector(x, y), a);
    },
    toString(precision?: number) {
      const precisedX = precision !== undefined ? round(x, precision) : x;
      const precisedY = precision !== undefined ? round(y, precision) : y;

      return `(${precisedX},${precisedY})`;
    },
  };
}

Vector.mag = mag;
Vector.add = add;
Vector.sub = sub;
Vector.mult = mult;
Vector.div = div;
