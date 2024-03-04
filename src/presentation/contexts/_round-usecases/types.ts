import { RoundModel } from '@domain/models';

import { GetRoundUsecase, PassTurnUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type RoundUsecasesContextValue = {
  round: RoundModel | null;
  passTurn: PassTurnUsecase['execute'];
  passLightspotTurn: PassTurnUsecase['execute'];
};

export interface RoundUsecasesContextProviderProps
  extends ContextProviderProps {
  getRound: GetRoundUsecase;
  passTurn: PassTurnUsecase;
}
