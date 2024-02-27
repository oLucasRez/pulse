import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { RoundUsecasesContextProvider } from '@presentation/contexts';

import {
  makeCreateRoundUsecase,
  makeGetRoundUsecase,
  makePassTurnUsecase,
} from '@main/factories';

export function makeRoundUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getRound = makeGetRoundUsecase();
  const createRound = makeCreateRoundUsecase();
  const passTurn = makePassTurnUsecase();

  return (
    <RoundUsecasesContextProvider
      getRound={getRound}
      createRound={createRound}
      passTurn={passTurn}
      {...props}
    />
  );
}
