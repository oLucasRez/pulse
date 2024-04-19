import { ReactElement } from 'react';

import { CentralFactContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeCentralFactUsecase,
  makeGetCentralFactUsecase,
  makeWatchCentralFactUsecase,
} from '@main/factories';

export function makeCentralFactContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getCentralFact = makeGetCentralFactUsecase();
  const watchCentralFact = makeWatchCentralFactUsecase();
  const changeCentralFact = makeChangeCentralFactUsecase();

  return (
    <CentralFactContextProvider
      getCentralFact={getCentralFact}
      watchCentralFact={watchCentralFact}
      changeCentralFact={changeCentralFact}
      {...props}
    />
  );
}
