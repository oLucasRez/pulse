import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { CentralPulseUsecasesContextProvider } from '@presentation/contexts';

import {
  makeDatabaseChangeCentralPulseUsecase,
  makeDatabaseGetCentralPulseUsecase,
  makeSocketWatchCentralPulseUsecase,
} from '@main/factories';

export function makeCentralPulseUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCentralPulse = makeDatabaseGetCentralPulseUsecase();
  const watchCentralPulse = makeSocketWatchCentralPulseUsecase();
  const changeCentralPulse = makeDatabaseChangeCentralPulseUsecase();

  return (
    <CentralPulseUsecasesContextProvider
      getCentralPulse={getCentralPulse}
      watchCentralPulse={watchCentralPulse}
      changeCentralPulse={changeCentralPulse}
      {...props}
    />
  );
}
