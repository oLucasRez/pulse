import { ReactElement } from 'react';

import { RoundUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeGetRoundUsecase,
  makePassTurnUsecase,
  makeWatchRoundsUsecase,
} from '@main/factories';

export function makeRoundUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchRounds = makeWatchRoundsUsecase();
  const getRound = makeGetRoundUsecase();
  const passTurn = makePassTurnUsecase();

  return (
    <RoundUsecasesContextProvider
      watchRounds={watchRounds}
      getRound={getRound}
      passTurn={passTurn}
      {...props}
    />
  );
}
