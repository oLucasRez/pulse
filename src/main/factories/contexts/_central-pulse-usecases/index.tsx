import { ReactElement } from 'react';

import { CentralPulseUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import { makeWatchCentralPulseUsecase } from '@main/factories';

export function makeCentralPulseUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchCentralPulse = makeWatchCentralPulseUsecase();

  return (
    <CentralPulseUsecasesContextProvider
      watchCentralPulse={watchCentralPulse}
      {...props}
    />
  );
}
