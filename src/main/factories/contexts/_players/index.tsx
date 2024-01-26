import { ReactNode } from 'react';

import { makeDatabaseCreatePlayerUsecase } from '@main/factories/usecases';

import { ContextProviderProps } from '@presentation/types';

import { PlayersContextProvider } from '@presentation/contexts';

export function makePlayersContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const create = makeDatabaseCreatePlayerUsecase();

  return <PlayersContextProvider create={create} {...props} />;
}
