import { ReactElement } from 'react';

import { RoundContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import { makeGetRoundsUsecase, makeWatchRoundsUsecase } from '@main/factories';

export function makeRoundContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getRounds = makeGetRoundsUsecase();
  const watchRounds = makeWatchRoundsUsecase();

  return (
    <RoundContextProvider
      getRounds={getRounds}
      watchRounds={watchRounds}
      {...props}
    />
  );
}
