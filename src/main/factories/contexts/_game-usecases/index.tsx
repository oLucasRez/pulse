import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { GameUsecasesContextProvider } from '@presentation/contexts';

import {
  makeCreateGameUsecase,
  makeDeleteGameUsecase,
  makeGetCurrentGameUsecase,
  makeGetGamesUsecase,
  makeGetGameUsecase,
  makeSetCurrentGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const setCurrentGame = makeSetCurrentGameUsecase();
  const getGame = makeGetGameUsecase();
  const getGames = makeGetGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const deleteGame = makeDeleteGameUsecase();

  return (
    <GameUsecasesContextProvider
      getCurrentGame={getCurrentGame}
      setCurrentGame={setCurrentGame}
      getGame={getGame}
      getGames={getGames}
      createGame={createGame}
      deleteGame={deleteGame}
      {...props}
    />
  );
}
