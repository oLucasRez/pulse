import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { PlayerUsecasesContextProvider } from '@presentation/contexts';

import {
  makeBanPlayerUsecase,
  makeChangePlayerUsecase,
  makeCreatePlayerUsecase,
  makeWatchMyPlayerUsecase,
  makeWatchPlayersUsecase,
} from '@main/factories';

export function makePlayerUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const watchPlayers = makeWatchPlayersUsecase();
  const watchMyPlayer = makeWatchMyPlayerUsecase();
  const createPlayer = makeCreatePlayerUsecase();
  const changePlayer = makeChangePlayerUsecase();
  const banPlayer = makeBanPlayerUsecase();

  return (
    <PlayerUsecasesContextProvider
      watchPlayers={watchPlayers}
      watchMyPlayer={watchMyPlayer}
      createPlayer={createPlayer}
      changePlayer={changePlayer}
      banPlayer={banPlayer}
      {...props}
    />
  );
}
