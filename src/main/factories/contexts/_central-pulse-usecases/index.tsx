import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { CentralPulseUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeCentralPulseUsecase,
  makeGetCentralPulseUsecase,
  makeWatchCentralPulseUsecase,
} from '@main/factories';

export function makeCentralPulseUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCentralPulse = makeGetCentralPulseUsecase();
  const watchCentralPulse = makeWatchCentralPulseUsecase();
  const changeCentralPulse = makeChangeCentralPulseUsecase();

  return (
    <CentralPulseUsecasesContextProvider
      getCentralPulse={getCentralPulse}
      watchCentralPulse={watchCentralPulse}
      changeCentralPulse={changeCentralPulse}
      {...props}
    />
  );
}
