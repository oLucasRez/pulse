import { useCallback } from 'react';

import { LandmarkModel, PulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { GetSubjectsByCrossingHookReturn } from './types';

import { usePulse } from '../_use-pulse';
import { useSubject } from '../_use-subject';

const tolerance = 0.01;

export function useGetSubjectsByCrossing(): GetSubjectsByCrossingHookReturn {
  const { pulses } = usePulse();
  const { subjects } = useSubject();

  return useCallback(
    (crossing: Vector) => {
      const crossedPulses: PulseModel<LandmarkModel>[] = [];

      for (const pulse of pulses) {
        const u = crossing.sub(pulse.origin).mag();

        if (u > pulse.amount * pulse.gap + tolerance) continue;

        const distance = u / pulse.gap;

        if (
          distance % 1 > 1 - tolerance ||
          (distance % 1 < tolerance && !pulse.overloaded)
        )
          crossedPulses.push(pulse);
      }

      return subjects.filter(({ id }) =>
        crossedPulses.find(({ landmarkID }) => id === landmarkID),
      );
    },
    [pulses, subjects],
  );
}
