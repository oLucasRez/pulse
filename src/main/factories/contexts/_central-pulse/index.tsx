import { ReactElement } from 'react';

import { CentralPulseContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeGetCentralPulseUsecase,
  makeWatchCentralPulseUsecase,
} from '@main/factories';

export function makeCentralPulseContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getCentralPulse = makeGetCentralPulseUsecase();
  const watchCentralPulse = makeWatchCentralPulseUsecase();

  return (
    <CentralPulseContextProvider
      getCentralPulse={getCentralPulse}
      watchCentralPulse={watchCentralPulse}
      {...props}
    />
  );
}
