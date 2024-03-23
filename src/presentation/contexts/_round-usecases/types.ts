import { DiceModel, PlayerModel, RoundModel } from '@domain/models';
import {
  GetRoundUsecase,
  PassTurnUsecase,
  WatchRoundsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type RoundUsecasesContextValue = {
  round: RoundModel | null;
  currentPlayer: PlayerModel | null;
  currentDice: DiceModel | null;
  lightSpotRound: RoundModel | null;
  currentLightSpotPlayer: PlayerModel | null;
  currentLightSpotDice: DiceModel | null;
  watchRounds(
    callback?: WatchRoundsUsecase.Callback,
  ): Promise<WatchRoundsUsecase.Response>;
};

export interface RoundUsecasesContextProviderProps
  extends ContextProviderProps {
  getRound: GetRoundUsecase;
  passTurn: PassTurnUsecase;
  watchRounds: WatchRoundsUsecase;
}
