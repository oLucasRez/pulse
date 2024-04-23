import { DiceModel } from '@domain/models';
import {
  IGetDicesUsecase,
  IRollCurrentDiceUsecase,
  IRollCurrentLightSpotDiceUsecase,
  IWatchDicesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type DiceContextValue = {
  dices: DiceModel[];
  currentDice: DiceModel | null;
  currentLightSpotDice: DiceModel | null;
  rollCurrentDice: IRollCurrentDiceUsecase['execute'];
  rollCurrentLightSpotDice: IRollCurrentLightSpotDiceUsecase['execute'];
};

export interface DiceContextProviderProps extends ContextProviderProps {
  getDices: IGetDicesUsecase;
  watchDices: IWatchDicesUsecase;
  rollCurrentDice: IRollCurrentDiceUsecase;
  rollCurrentLightSpotDice: IRollCurrentLightSpotDiceUsecase;
}
