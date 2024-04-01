import { ReactElement } from 'react';

import { SubjectPulseUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateSubjectPulseUsecase,
  makeWatchSubjectPulsesUsecase,
} from '@main/factories';

export function makeSubjectPulseUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchSubjectPulses = makeWatchSubjectPulsesUsecase();
  const createSubjectPulse = makeCreateSubjectPulseUsecase();

  return (
    <SubjectPulseUsecasesContextProvider
      watchSubjectPulses={watchSubjectPulses}
      createSubjectPulse={createSubjectPulse}
      {...props}
    />
  );
}
