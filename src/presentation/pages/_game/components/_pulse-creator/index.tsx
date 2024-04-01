import { FC, ReactNode, useEffect, useMemo } from 'react';

import { Circle, Vector } from '@domain/utils';

import { useStates } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { PulseCreatorProps } from './types';

import { Crossings, useMapContext } from '..';

export const PulseCreator: FC<PulseCreatorProps> = (props) => {
  const { origin, amount, color, onCreatePulse } = props;

  const [s, set] = useStates({
    gap: 0,
    crossing: null as Vector | null,
  });

  const { mapSpace, onMouseMove, onClick } = useMapContext();

  useEffect(
    () => onMouseMove((mouse) => (s.gap = origin.sub(mouse).mag() / amount)),
    [],
  );

  useEffect(
    () =>
      onClick(() => {
        if (!s.crossing) return;

        onCreatePulse?.({ amount, gap: s.gap, origin });
      }),
    [],
  );

  const targetCircle = useMemo(
    () => new Circle(origin, amount * s.gap),
    [origin, amount, s.gap],
  );

  const circles: ReactNode[] = [];

  for (let i = 1; i <= amount; i++) {
    const parsedOrigin = mapSpace.mult(origin);
    const parsedGap = mapSpace.mult(s.gap);

    circles.push(
      <circle
        key={i}
        cx={parsedOrigin.x}
        cy={parsedOrigin.y}
        r={i * parsedGap}
        fill='none'
        stroke={getColor(color)}
      />,
    );
  }

  return (
    <>
      <Crossings
        targetCircle={targetCircle}
        onSelectCrossing={set('crossing')}
      />

      {circles}
    </>
  );
};

export { CreatePulseEvent } from './types';
