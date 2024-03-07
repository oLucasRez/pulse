import { ReactElement } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { UserUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeMeUsecase,
  makeSetCurrentGameUsecase,
} from '@main/factories';

export function makeUserUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const changeMe = makeChangeMeUsecase();
  const setCurrentGame = makeSetCurrentGameUsecase();

  return (
    <UserUsecasesContextProvider
      changeMe={changeMe}
      setCurrentGame={setCurrentGame}
      {...props}
    />
  );
}
