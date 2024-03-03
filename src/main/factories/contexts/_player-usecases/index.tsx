import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { PlayerUsecasesContextProvider } from '@presentation/contexts';

import {
  makeBanPlayerUsecase,
  makeChangePlayerUsecase,
  makeCreatePlayerUsecase,
  makeDeletePlayerUsecase,
  makeGetCurrentPlayerUsecase,
  makeGetMyPlayerUsecase,
  makeGetPlayersUsecase,
  makeGetPlayerUsecase,
  makeWatchMyPlayerUsecase,
  makeWatchPlayersUsecase,
} from '@main/factories';

export function makePlayerUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getPlayers = makeGetPlayersUsecase();
  const getPlayer = makeGetPlayerUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getCurrentPlayer = makeGetCurrentPlayerUsecase();
  const watchPlayers = makeWatchPlayersUsecase();
  const watchMyPlayer = makeWatchMyPlayerUsecase();
  const createPlayer = makeCreatePlayerUsecase();
  const changePlayer = makeChangePlayerUsecase();
  const deletePlayer = makeDeletePlayerUsecase();
  const banPlayer = makeBanPlayerUsecase();

  return (
    <PlayerUsecasesContextProvider
      getPlayers={getPlayers}
      getPlayer={getPlayer}
      getMyPlayer={getMyPlayer}
      getCurrentPlayer={getCurrentPlayer}
      watchPlayers={watchPlayers}
      watchMyPlayer={watchMyPlayer}
      createPlayer={createPlayer}
      changePlayer={changePlayer}
      deletePlayer={deletePlayer}
      banPlayer={banPlayer}
      {...props}
    />
  );
}
