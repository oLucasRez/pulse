import { useCallback } from 'react';

import { LandmarkModel, PulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { GetSubjectsByCrossingHookReturn } from './types';

import { usePulse } from '../_use-pulse';
import { useSubject } from '../_use-subject';

export function useGetSubjectsByCrossing(): GetSubjectsByCrossingHookReturn {
  const { pulses } = usePulse();
  const { subjects } = useSubject();

  return useCallback(
    (crossing: Vector) => {
      const crossedPulses: PulseModel<LandmarkModel>[] = [];

      for (const pulse of pulses) {
        const distance = crossing.sub(pulse.origin).mag() % pulse.gap;

        if (distance < 0.01 && !pulse.overloaded) crossedPulses.push(pulse);
      }

      return subjects.filter(({ id }) =>
        crossedPulses.find(({ landmarkID }) => id === landmarkID),
      );
    },
    [pulses, subjects],
  );
}
