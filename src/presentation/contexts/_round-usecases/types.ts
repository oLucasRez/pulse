import {
  CreateRoundUsecase,
  GetRoundUsecase,
  PassTurnUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type RoundUsecasesContextValue = {
  getRound: GetRoundUsecase;
  createRound: CreateRoundUsecase;
  passTurn: PassTurnUsecase;
};

export interface RoundUsecasesContextProviderProps
  extends ContextProviderProps {
  getRound: GetRoundUsecase;
  createRound: CreateRoundUsecase;
  passTurn: PassTurnUsecase;
}
