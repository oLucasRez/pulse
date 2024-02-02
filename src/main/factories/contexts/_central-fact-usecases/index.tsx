import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { CentralFactUsecasesContextProvider } from '@presentation/contexts';

import {
  makeDatabaseChangeCentralFactUsecase,
  makeDatabaseGetCentralFactUsecase,
  makeSocketWatchCentralFactUsecase,
} from '@main/factories';

export function makeCentralFactUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCentralFact = makeDatabaseGetCentralFactUsecase();
  const watchCentralFact = makeSocketWatchCentralFactUsecase();
  const changeCentralFact = makeDatabaseChangeCentralFactUsecase();

  return (
    <CentralFactUsecasesContextProvider
      getCentralFact={getCentralFact}
      watchCentralFact={watchCentralFact}
      changeCentralFact={changeCentralFact}
      {...props}
    />
  );
}
