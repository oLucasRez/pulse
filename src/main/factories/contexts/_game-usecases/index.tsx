import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { GameUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeGameUsecase,
  makeCreateGameUsecase,
  makeDeleteGameUsecase,
  makeGetGamesUsecase,
  makeStartGameUsecase,
  makeWatchCurrentGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const watchCurrentGame = makeWatchCurrentGameUsecase();
  const getGames = makeGetGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const changeGame = makeChangeGameUsecase();
  const deleteGame = makeDeleteGameUsecase();

  const startGame = makeStartGameUsecase();

  return (
    <GameUsecasesContextProvider
      watchCurrentGame={watchCurrentGame}
      getGames={getGames}
      createGame={createGame}
      changeGame={changeGame}
      deleteGame={deleteGame}
      startGame={startGame}
      {...props}
    />
  );
}
