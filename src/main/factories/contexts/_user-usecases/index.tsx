import { ReactElement } from 'react';

import { UserUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

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
