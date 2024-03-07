import { ReactElement } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { DiceUsecasesContextProvider } from '@presentation/contexts';

import { makeWatchDicesUsecase } from '@main/factories';

export function makeDiceUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchDices = makeWatchDicesUsecase();

  return <DiceUsecasesContextProvider watchDices={watchDices} {...props} />;
}
