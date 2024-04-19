import { ReactElement } from 'react';

import { PlayerContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeBanPlayerUsecase,
  makeChangePlayerUsecase,
  makeCreatePlayerUsecase,
  makeGetPlayersUsecase,
  makeWatchPlayersUsecase,
} from '@main/factories';

export function makePlayerContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getPlayers = makeGetPlayersUsecase();
  const watchPlayers = makeWatchPlayersUsecase();
  const createPlayer = makeCreatePlayerUsecase();
  const changePlayer = makeChangePlayerUsecase();
  const banPlayer = makeBanPlayerUsecase();

  return (
    <PlayerContextProvider
      getPlayers={getPlayers}
      watchPlayers={watchPlayers}
      createPlayer={createPlayer}
      changePlayer={changePlayer}
      banPlayer={banPlayer}
      {...props}
    />
  );
}
