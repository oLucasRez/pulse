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
  makeVoteUsecase,
  makeWatchCurrentGameUsecase,
} from '@main/factories';

export function makeGameUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchCurrentGame = makeWatchCurrentGameUsecase();
  const getGame = makeGetGameUsecase();
  const getGames = makeGetGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const changeGame = makeChangeGameUsecase();
  const deleteGame = makeDeleteGameUsecase();
  const startGame = makeStartGameUsecase();
  const vote = makeVoteUsecase();

  return (
    <GameUsecasesContextProvider
      watchCurrentGame={watchCurrentGame}
      getGame={getGame}
      getGames={getGames}
      createGame={createGame}
      changeGame={changeGame}
      deleteGame={deleteGame}
      startGame={startGame}
      vote={vote}
      {...props}
    />
  );
}
