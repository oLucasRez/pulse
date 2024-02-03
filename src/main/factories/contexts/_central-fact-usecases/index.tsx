import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { CentralFactUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeCentralFactUsecase,
  makeGetCentralFactUsecase,
  makeWatchCentralFactUsecase,
} from '@main/factories';

export function makeCentralFactUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCentralFact = makeGetCentralFactUsecase();
  const watchCentralFact = makeWatchCentralFactUsecase();
  const changeCentralFact = makeChangeCentralFactUsecase();

  return (
    <CentralFactUsecasesContextProvider
      getCentralFact={getCentralFact}
      watchCentralFact={watchCentralFact}
      changeCentralFact={changeCentralFact}
      {...props}
    />
  );
}
