import { ReactElement } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { RoundUsecasesContextProvider } from '@presentation/contexts';

import { makeGetRoundUsecase, makePassTurnUsecase } from '@main/factories';

export function makeRoundUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getRound = makeGetRoundUsecase();
  const passTurn = makePassTurnUsecase();

  return (
    <RoundUsecasesContextProvider
      getRound={getRound}
      passTurn={passTurn}
      {...props}
    />
  );
}
