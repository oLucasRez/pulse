import { FC, ReactNode } from 'react';

import {
  useCentralPulseUsecases,
  useSubjectPulseUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { getColor } from '@presentation/styles/mixins';

import { PulseProps } from './types';

import { useMapContext } from '..';

export const Pulse: FC<PulseProps> = ({ origin, amount, gap, landmarkID }) => {
  const { mapSpace } = useMapContext();
  const { subjects } = useSubjectUsecases();

  const landmark = subjects.find((value) => value.id === landmarkID);

  const c = mapSpace.mult(origin);

  const circles: ReactNode[] = [
    <circle
      key={0}
      cx={c.x}
      cy={c.y}
      r={2}
      fill={landmark ? getColor(landmark.color) : '#757575'}
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
        stroke={landmark ? getColor(landmark.color) : '#757575'}
      />,
    );
  }

  return <>{circles}</>;
};

export const Pulses: FC = () => {
  const { centralPulse } = useCentralPulseUsecases();
  const { subjectPulses } = useSubjectPulseUsecases();

  return (
    <>
      {centralPulse && <Pulse {...centralPulse} />}
      {subjectPulses.map((subjectPulse) => (
        <Pulse key={subjectPulse.id} {...subjectPulse} />
      ))}
    </>
  );
};
