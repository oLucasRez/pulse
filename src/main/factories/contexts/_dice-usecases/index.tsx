import { ReactElement } from 'react';

import { DiceUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import { makeWatchDicesUsecase } from '@main/factories';

export function makeDiceUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchDices = makeWatchDicesUsecase();

  return <DiceUsecasesContextProvider watchDices={watchDices} {...props} />;
}
