import { ReactNode } from 'react';

import {
  makeDatabaseCreatePlayerUsecase,
  makeDatabaseDeletePlayerUsecase,
} from '@main/factories/usecases';

import { ContextProviderProps } from '@presentation/types';

import { PlayerUsecasesContextProvider } from '@presentation/contexts';

export function makePlayerUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const createPlayer = makeDatabaseCreatePlayerUsecase();
  const deletePlayer = makeDatabaseDeletePlayerUsecase();

  return (
    <PlayerUsecasesContextProvider
      createPlayer={createPlayer}
      deletePlayer={deletePlayer}
      {...props}
    />
  );
}
