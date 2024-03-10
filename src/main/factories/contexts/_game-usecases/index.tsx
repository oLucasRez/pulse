import { ReactElement } from 'react';

import { GameUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeGameUsecase,
  makeCreateGameUsecase,
  makeDeleteGameUsecase,
  makeGetGamesUsecase,
  makeGetGameUsecase,
  makeStartGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getGame = makeGetGameUsecase();
  const getGames = makeGetGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const changeGame = makeChangeGameUsecase();
  const deleteGame = makeDeleteGameUsecase();

  const startGame = makeStartGameUsecase();

  return (
    <GameUsecasesContextProvider
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
