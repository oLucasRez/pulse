import { ReactElement } from 'react';

import { GameContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeGameUsecase,
  makeCreateGameUsecase,
  makeDeleteGameUsecase,
  makeGetGamesUsecase,
  makeStartGameUsecase,
  makeVoteUsecase,
  makeWatchGamesUsecase,
} from '@main/factories';

export function makeGameContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getGames = makeGetGamesUsecase();
  const watchGames = makeWatchGamesUsecase();
  const createGame = makeCreateGameUsecase();
  const changeGame = makeChangeGameUsecase();
  const deleteGame = makeDeleteGameUsecase();
  const startGame = makeStartGameUsecase();
  const vote = makeVoteUsecase();

  return (
    <GameContextProvider
      getGames={getGames}
      watchGames={watchGames}
      createGame={createGame}
      changeGame={changeGame}
      deleteGame={deleteGame}
      startGame={startGame}
      vote={vote}
      {...props}
    />
  );
}
