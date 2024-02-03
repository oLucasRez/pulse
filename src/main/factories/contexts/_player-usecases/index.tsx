import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { PlayerUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangePlayerUsecase,
  makeCreatePlayerUsecase,
  makeDeletePlayerUsecase,
  makeGetPlayersUsecase,
  makeGetPlayerUsecase,
  makeWatchPlayersUsecase,
} from '@main/factories';

export function makePlayerUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getPlayers = makeGetPlayersUsecase();
  const getPlayer = makeGetPlayerUsecase();
  const watchPlayers = makeWatchPlayersUsecase();
  const createPlayer = makeCreatePlayerUsecase();
  const changePlayer = makeChangePlayerUsecase();
  const deletePlayer = makeDeletePlayerUsecase();

  return (
    <PlayerUsecasesContextProvider
      getPlayers={getPlayers}
      getPlayer={getPlayer}
      watchPlayers={watchPlayers}
      createPlayer={createPlayer}
      changePlayer={changePlayer}
      deletePlayer={deletePlayer}
      {...props}
    />
  );
}
