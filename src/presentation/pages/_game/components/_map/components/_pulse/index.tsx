import { FC, ReactNode } from 'react';

import { Vector } from '@domain/utils';

import { PulseProps } from './types';

import { useMapContext } from '../..';

export const Pulse: FC<PulseProps> = ({ pulse }) => {
  const { origin, amount, gap } = pulse;

  const { mapSpace } = useMapContext();

  const c = mapSpace.mult(Vector.fromJSON(origin));

  const circles: ReactNode[] = [
    <circle key={0} cx={c.x} cy={c.y} r={2} fill='#555' stroke='none' />,
  ];

  for (let i = 1; i <= amount; i++) {
    const r = mapSpace.mult(i * gap);

    circles.push(
      <circle key={i} cx={c.x} cy={c.y} r={r} fill='none' stroke='#555' />,
    );
  }

  return <>{circles}</>;
};
