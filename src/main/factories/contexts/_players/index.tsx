import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { PlayerUsecasesContextProvider } from '@presentation/contexts';

import {
  makeDatabaseChangePlayerUsecase,
  makeDatabaseCreatePlayerUsecase,
  makeDatabaseDeletePlayerUsecase,
  makeDatabaseGetPlayersUsecase,
} from '@main/factories';

export function makePlayerUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getPlayers = makeDatabaseGetPlayersUsecase();
  const createPlayer = makeDatabaseCreatePlayerUsecase();
  const changePlayer = makeDatabaseChangePlayerUsecase();
  const deletePlayer = makeDatabaseDeletePlayerUsecase();

  return (
    <PlayerUsecasesContextProvider
      getPlayers={getPlayers}
      createPlayer={createPlayer}
      changePlayer={changePlayer}
      deletePlayer={deletePlayer}
      {...props}
    />
  );
}
