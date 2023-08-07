import { Pulse, Subject, SubjectPulse } from '@domain/models';

import { circle, crossing, vector } from '@types';

import { abs, pow, sqrt, unique, Vector } from '..';

function get(
  target: SubjectPulse,
  neighborhood: Pulse[],
  tolerance: number = 0,
): crossing[] {
  const targetLastCircle = target.getLastCircle();

  if (!targetLastCircle) return [];

  function calcCrossings(c1: circle, c2: circle): vector[] {
    const d = c1.c.sub(c2.c).mag();
    const a = (pow(c1.r, 2) - pow(c2.r, 2) + pow(d, 2)) / (2 * d);
    const h = sqrt(pow(c1.r, 2) - pow(a, 2));
    const p3 = c1.c.add(c2.c.sub(c1.c).mult(a / d));

    if (isNaN(h)) return [];

    return [
      Vector(
        p3.x + ((c2.c.y - c1.c.y) * h) / d,
        p3.y - ((c2.c.x - c1.c.x) * h) / d,
      ),
      Vector(
        p3.x - ((c2.c.y - c1.c.y) * h) / d,
        p3.y + ((c2.c.x - c1.c.x) * h) / d,
      ),
    ];
  }

  const crossings: crossing[] = [];

  for (const pulse of neighborhood) {
    if (target.isEqual(pulse)) continue;

    for (const circle of pulse.getCircles()) {
      const positions = calcCrossings(targetLastCircle, circle);

      const targetSubject = target.getSubject();

      const scope = [targetSubject];

      if (pulse instanceof SubjectPulse) {
        const pulseSubject = pulse.getSubject();

        if (!targetSubject.isEqual(pulseSubject))
          scope.push(pulse.getSubject());
      }

      positions.map((position) => crossings.push(Crossing(scope, position)));
    }
  }

  return crossings;

  // const crossingsAreEqual = (
  //   crossingA: crossing,
  //   crossingB: crossing,
  // ): boolean =>
  //   abs(crossingA.position.mag() - crossingB.position.mag()) <= tolerance;

  // const replaceCrossingsWith = (
  //   crossingA: crossing,
  //   crossingB: crossing,
  // ): crossing => {
  //   const pA = crossingA.scope.length;
  //   const pB = crossingB.scope.length;

  //   const position = crossingA.position
  //     .mult(pA)
  //     .add(crossingB.position.mult(pB))
  //     .div(pA + pB);

  //   return Crossing([...crossingA.scope, ...crossingB.scope], position);
  // };

  // const filteredCrossings = unique(
  //   crossings,
  //   crossingsAreEqual,
  //   replaceCrossingsWith,
  // );

  // for (const crossing of filteredCrossings) {
  //   const subjectsAreEqual = (subjectA: Subject, subjectB: Subject): boolean =>
  //     subjectA.isEqual(subjectB);

  //   crossing.scope = unique(crossing.scope, subjectsAreEqual);
  // }

  // return filteredCrossings;
}

export function Crossing(scope: Subject[], position: vector): crossing {
  return {
    scope,
    position,
    toDTO(): crossing.DTO {
      return Object.freeze({
        scope: scope.map((subject) => subject.toDTO()),
        position: position.toDTO(),
      });
    },
  };
}

Crossing.get = get;

Object.freeze(Crossing);
