import { FC, useEffect, useMemo } from 'react';

import { LandmarkModel, PulseModel } from '@domain/models';
import { Circle, Vector } from '@domain/utils';

import { usePulse, useStates } from '@presentation/hooks';

import { CrossingsProps } from './types';

import { useMapContext } from '..';

const { pow, sqrt } = Math;

function calcCrossings(c1: Circle, c2: Circle): Vector[] {
  const d = c1.c.sub(c2.c).mag();
  const a = (pow(c1.r, 2) - pow(c2.r, 2) + pow(d, 2)) / (2 * d);
  const h = sqrt(pow(c1.r, 2) - pow(a, 2));
  const p3 = c1.c.sum(c1.c.sub(c2.c).mult(a / d));

  if (isNaN(h)) return [];

  const crossing1 = new Vector([
    p3.x + ((c2.c.y - c1.c.y) * h) / d,
    p3.y - ((c2.c.x - c1.c.x) * h) / d,
  ]);
  const crossing2 = new Vector([
    p3.x - ((c2.c.y - c1.c.y) * h) / d,
    p3.y + ((c2.c.x - c1.c.x) * h) / d,
  ]);

  return [crossing1, crossing2];
}

function getCircles(pulse: PulseModel<LandmarkModel>): Circle[] {
  const circles: Circle[] = [];

  for (let i = 1; i <= pulse.amount; i++)
    circles.push(new Circle(pulse.origin, i * pulse.gap));

  return circles;
}

export const Crossings: FC<CrossingsProps> = (props) => {
  const { targetCircle, onSelectCrossing } = props;

  const [s, set] = useStates({
    mouse: new Vector([0, 0]),
    nearest: null as Vector | null,
  });

  const { mapSpace, onMouseMove } = useMapContext();

  const { pulses } = usePulse();

  const crossings = useMemo(() => {
    const value: Vector[] = [];

    for (const pulse of pulses.filter(({ overloaded }) => !overloaded))
      for (const circle of getCircles(pulse)) {
        const positions = calcCrossings(circle, targetCircle);

        value.push(...positions);
      }

    return value;
  }, [targetCircle, pulses]);

  useEffect(() => onMouseMove(set('mouse')), []);

  useEffect(() => {
    let nearest: Vector | null = null;

    for (const crossing of crossings)
      if (crossing.sub(s.mouse).mag() < 1) {
        if (!nearest) nearest = crossing;
        else if (crossing.sub(s.mouse).mag() < nearest.sub(s.mouse).mag())
          nearest = crossing;
      }

    s.nearest = nearest;
  }, [s.mouse, crossings]);

  useEffect(() => {
    onSelectCrossing?.(s.nearest);
  }, [s.nearest?.x, s.nearest?.y]);

  const nearest = s.nearest && mapSpace.mult(s.nearest);

  if (!nearest) return null;

  return <circle cx={nearest.x} cy={nearest.y} r={8} opacity={0.1} />;
};
