import { RoundModel } from '@domain/models';
import { IGetRoundsUsecase, IWatchRoundsUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type RoundContextValue = {
  round: RoundModel | null;
  lightSpotRound: RoundModel | null;
};

export interface RoundContextProviderProps extends ContextProviderProps {
  getRounds: IGetRoundsUsecase;
  watchRounds: IWatchRoundsUsecase;
}
