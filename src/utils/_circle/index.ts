import { circle, vector } from '@types';

import { abs, pow, round, sqrt, Vector } from '..';

function getCrossings(
  target: circle,
  circles: circle[],
  tolerance: number = 0,
): vector[] {
  const crossings: vector[] = [];

  for (let i = 0; i < circles.length; i++) {
    const current = circles[i];

    const d = target.c.sub(current.c).mag();
    const a = (pow(target.r, 2) - pow(current.r, 2) + pow(d, 2)) / (2 * d);
    const h = sqrt(pow(target.r, 2) - pow(a, 2));
    const p3 = target.c.add(current.c.sub(target.c).mult(a / d));

    if (isNaN(h)) continue;

    crossings.push(
      Vector(
        p3.x + ((current.c.y - target.c.y) * h) / d,
        p3.y - ((current.c.x - target.c.x) * h) / d,
      ),
    );
    crossings.push(
      Vector(
        p3.x - ((current.c.y - target.c.y) * h) / d,
        p3.y + ((current.c.x - target.c.x) * h) / d,
      ),
    );
  }

  for (let i = 0; i < crossings.length; i++) {
    const crossing1 = crossings[i];

    for (let j = i + 1; j < crossings.length; j++) {
      const crossing2 = crossings[j];

      const sameCrossing = abs(crossing1.mag() - crossing2.mag()) <= tolerance;

      if (sameCrossing) {
        crossings.splice(i, 1);
        crossings.splice(j - 1, 1);

        const newCrossing = crossing1.add(crossing2).div(2);
        crossings.push(newCrossing);
      }
    }
  }

  return crossings;
}

export function Circle(c: vector, r: number): circle {
  return Object.freeze({
    c,
    r,
    getCrossings(circles: circle[], tolerance?: number) {
      return getCrossings(Circle(c, r), circles, tolerance);
    },
    toString(precision: number = 4) {
      return `(${c.toString(precision)},${round(r, precision)})`;
    },
  });
}

Circle.getCrossings = getCrossings;

Object.freeze(Circle);
