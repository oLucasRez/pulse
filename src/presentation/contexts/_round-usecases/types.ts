import { PlayerModel, RoundModel } from '@domain/models';
import {
  GetRoundUsecase,
  PassTurnUsecase,
  WatchRoundsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type RoundUsecasesContextValue = {
  round: RoundModel | null;
  currentPlayer: PlayerModel | null;
  lightSpotRound: RoundModel | null;
  currentLightSpotPlayer: PlayerModel | null;
  passTurn(): Promise<RoundModel>;
  passLightSpotTurn(): Promise<RoundModel>;
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
