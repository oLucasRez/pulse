import { ReactElement } from 'react';

import { CentralPulseUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeCentralPulseUsecase,
  makeGetCentralPulseUsecase,
  makeWatchCentralPulseUsecase,
} from '@main/factories';

export function makeCentralPulseUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
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
