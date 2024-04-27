import { FC, ReactNode } from 'react';

import { useLandmark, usePulse } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { PulseProps } from './types';

import { useMapContext } from '..';

export const Pulse: FC<PulseProps> = ({
  origin,
  amount,
  gap,
  overloaded,
  landmarkID,
}) => {
  const { mapSpace } = useMapContext();
  const { landmarks } = useLandmark();

  const landmark = landmarks.find((value) => value.id === landmarkID);

  const c = mapSpace.mult(origin);

  const circles: ReactNode[] = [
    <circle
      key={0}
      cx={c.x}
      cy={c.y}
      r={2}
      fill={getColor(landmark?.color)}
      stroke='none'
    />,
  ];

  for (let i = 1; i <= amount; i++) {
    const r = mapSpace.mult(i * gap);

    circles.push(
      <circle
        key={i}
        cx={c.x}
        cy={c.y}
        r={r}
        fill='none'
        stroke={getColor(landmark?.color)}
        strokeDasharray={!landmark || overloaded ? 3 : undefined}
      />,
    );
  }

  return <g opacity={overloaded ? 0.4 : 1}>{circles}</g>;
};

export const Pulses: FC = () => {
  const { pulses } = usePulse();

  return (
    <>
      {pulses.map((pulse) => (
        <Pulse key={pulse.id} {...pulse} />
      ))}
    </>
  );
};
