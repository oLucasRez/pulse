import { vector } from '@types';

import { cos, round, sin, sqrt } from '..';

function mag(u: vector): number {
  return sqrt(u.x * u.x + u.y * u.y);
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
  return Object.freeze({
    x,
    y,
    toDTO() {
      return Object.freeze({
        x,
        y,
      });
    },
    mag() {
      return mag(Vector(x, y));
    },
    add(u: vector) {
      return add(Vector(x, y), u);
    },
    sub(u: vector) {
      return sub(Vector(x, y), u);
    },
    mult(a: number) {
      return mult(Vector(x, y), a);
    },
    div(a: number) {
      return div(Vector(x, y), a);
    },
    toString(precision: number = 4) {
      const precisedX = precision !== undefined ? round(x, precision) : x;
      const precisedY = precision !== undefined ? round(y, precision) : y;

      return `(${precisedX.toFixed(precision)},${precisedY.toFixed(
        precision,
      )})`;
    },
  });
}

Vector.mag = mag;
Vector.add = add;
Vector.sub = sub;
Vector.mult = mult;
Vector.div = div;

Vector.polar = (r: number, θ: number): vector => {
  const x = r * cos(θ);
  const y = r * sin(θ);

  return Vector(x, y);
};

Object.freeze(Vector);
