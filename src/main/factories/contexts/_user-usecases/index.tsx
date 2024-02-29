import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { UserUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeMeUsecase,
  makeGetMeUsecase,
  makeSetCurrentGameUsecase,
  makeWatchMeUsecase,
} from '@main/factories';

export function makeUserUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getMe = makeGetMeUsecase();
  const watchMe = makeWatchMeUsecase();
  const changeMe = makeChangeMeUsecase();
  const setCurrentGame = makeSetCurrentGameUsecase();

  return (
    <UserUsecasesContextProvider
      getMe={getMe}
      watchMe={watchMe}
      changeMe={changeMe}
      setCurrentGame={setCurrentGame}
      {...props}
    />
  );
}
