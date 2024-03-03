import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { GameUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeGameUsecase,
  makeCreateGameUsecase,
  makeDeleteGameUsecase,
  makeGetCurrentGameUsecase,
  makeGetGamesUsecase,
  makeGetGameUsecase,
  makeStartGameUsecase,
  makeWatchCurrentGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const watchCurrentGame = makeWatchCurrentGameUsecase();
  const getGame = makeGetGameUsecase();
  const getGames = makeGetGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const changeGame = makeChangeGameUsecase();
  const deleteGame = makeDeleteGameUsecase();

  const startGame = makeStartGameUsecase();

  return (
    <GameUsecasesContextProvider
      getCurrentGame={getCurrentGame}
      watchCurrentGame={watchCurrentGame}
      getGame={getGame}
      getGames={getGames}
      createGame={createGame}
      changeGame={changeGame}
      deleteGame={deleteGame}
      startGame={startGame}
      {...props}
    />
  );
}
