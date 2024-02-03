import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { GameUsecasesContextProvider } from '@presentation/contexts';

import {
  makeCreateGameUsecase,
  makeDeleteGameUsecase,
  makeGetGamesUsecase,
  makeGetGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getGame = makeGetGameUsecase();
  const getGames = makeGetGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const deleteGame = makeDeleteGameUsecase();

  return (
    <GameUsecasesContextProvider
      getGame={getGame}
      getGames={getGames}
      createGame={createGame}
      deleteGame={deleteGame}
      {...props}
    />
  );
}
