import { ReactElement } from 'react';

import { SubjectPulseContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateSubjectPulseUsecase,
  makeGetSubjectPulsesUsecase,
  makeWatchSubjectPulsesUsecase,
} from '@main/factories';

export function makeSubjectPulseContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getSubjectPulses = makeGetSubjectPulsesUsecase();
  const watchSubjectPulses = makeWatchSubjectPulsesUsecase();
  const createSubjectPulse = makeCreateSubjectPulseUsecase();

  return (
    <SubjectPulseContextProvider
      getSubjectPulses={getSubjectPulses}
      watchSubjectPulses={watchSubjectPulses}
      createSubjectPulse={createSubjectPulse}
      {...props}
    />
  );
}
