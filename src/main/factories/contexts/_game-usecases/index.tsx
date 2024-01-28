import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { GameUsecasesContextProvider } from '@presentation/contexts';

import {
  makeDatabaseCreateGameUsecase,
  makeDatabaseDeleteGameUsecase,
  makeDatabaseGetGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getGame = makeDatabaseGetGameUsecase();
  const createGame = makeDatabaseCreateGameUsecase();
  const deleteGame = makeDatabaseDeleteGameUsecase();

  return (
    <GameUsecasesContextProvider
      getGame={getGame}
      createGame={createGame}
      deleteGame={deleteGame}
      {...props}
    />
  );
}
