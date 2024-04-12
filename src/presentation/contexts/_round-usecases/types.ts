import { DiceModel, PlayerModel, RoundModel } from '@domain/models';
import {
  IGetRoundUsecase,
  IPassTurnUsecase,
  IWatchRoundsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type RoundUsecasesContextValue = {
  round: RoundModel | null;
  currentPlayer: PlayerModel | null;
  currentDice: DiceModel | null;
  lightSpotRound: RoundModel | null;
  currentLightSpotPlayer: PlayerModel | null;
  currentLightSpotDice: DiceModel | null;
  isMyTurn: boolean;
  watchRounds(
    callback?: IWatchRoundsUsecase.Callback,
  ): Promise<IWatchRoundsUsecase.Response>;
};

export interface RoundUsecasesContextProviderProps
  extends ContextProviderProps {
  getRound: IGetRoundUsecase;
  passTurn: IPassTurnUsecase;
  watchRounds: IWatchRoundsUsecase;
}
