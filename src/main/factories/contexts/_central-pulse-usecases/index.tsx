import { ReactElement } from 'react';

import { CentralPulseUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeCentralPulseUsecase,
  makeWatchCentralPulseUsecase,
} from '@main/factories';

export function makeCentralPulseUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchCentralPulse = makeWatchCentralPulseUsecase();
  const changeCentralPulse = makeChangeCentralPulseUsecase();

  return (
    <CentralPulseUsecasesContextProvider
      watchCentralPulse={watchCentralPulse}
      changeCentralPulse={changeCentralPulse}
      {...props}
    />
  );
}
