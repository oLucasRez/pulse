import { ReactElement } from 'react';

import { CentralFactUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeCentralFactUsecase,
  makeGetCentralFactUsecase,
  makeWatchCentralFactUsecase,
} from '@main/factories';

export function makeCentralFactUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
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
