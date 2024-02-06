import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { GameUsecasesContextProvider } from '@presentation/contexts';

import {
  makeCreateGameUsecase,
  makeDeleteGameUsecase,
  makeGetCurrentGameUsecase,
  makeGetGamesUsecase,
  makeGetGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getGame = makeGetGameUsecase();
  const getGames = makeGetGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const deleteGame = makeDeleteGameUsecase();

  return (
    <GameUsecasesContextProvider
      getCurrentGame={getCurrentGame}
      getGame={getGame}
      getGames={getGames}
      createGame={createGame}
      deleteGame={deleteGame}
      {...props}
    />
  );
}
