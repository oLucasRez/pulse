import { ReactElement } from 'react';

import { CentralFactUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeCentralFactUsecase,
  makeWatchCentralFactUsecase,
} from '@main/factories';

export function makeCentralFactUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchCentralFact = makeWatchCentralFactUsecase();
  const changeCentralFact = makeChangeCentralFactUsecase();

  return (
    <CentralFactUsecasesContextProvider
      watchCentralFact={watchCentralFact}
      changeCentralFact={changeCentralFact}
      {...props}
    />
  );
}
