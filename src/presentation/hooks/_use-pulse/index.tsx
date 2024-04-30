import { useMemo } from 'react';

import { LandmarkModel, PulseModel } from '@domain/models';

import { PulseHookReturn } from './types';

import { useCentralPulse } from '../_use-central-pulse';
import { useLightSpot } from '../_use-light-spot';
import { useSubjectPulse } from '../_use-subject-pulse';

export function usePulse(): PulseHookReturn {
  const { centralPulse } = useCentralPulse();
  const { lightSpots } = useLightSpot();
  const { subjectPulses } = useSubjectPulse();

  const pulses = useMemo<PulseModel<LandmarkModel>[]>(() => {
    if (centralPulse) return [centralPulse, ...lightSpots, ...subjectPulses];
    return [...lightSpots, ...subjectPulses];
  }, [centralPulse, lightSpots, subjectPulses]);

  return { pulses };
}
