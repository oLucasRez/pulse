import { ReactElement } from 'react';

import { PlayerUsecasesContextProvider } from '@presentation/contexts';

import {
  makeBanPlayerUsecase,
  makeChangePlayerUsecase,
  makeCreatePlayerUsecase,
  makeGetMyPlayerUsecase,
} from '@main/factories';

import { ContextProviderProps } from '@presentation/types';

export function makePlayerUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const createPlayer = makeCreatePlayerUsecase();
  const changePlayer = makeChangePlayerUsecase();
  const banPlayer = makeBanPlayerUsecase();

  return (
    <PlayerUsecasesContextProvider
      getMyPlayer={getMyPlayer}
      createPlayer={createPlayer}
      changePlayer={changePlayer}
      banPlayer={banPlayer}
      {...props}
    />
  );
}
