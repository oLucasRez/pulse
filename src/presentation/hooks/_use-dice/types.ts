import { DiceModel } from '@domain/models';
import {
  IGetDicesUsecase,
  IRollDiceUsecase,
  IWatchDicesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type DiceContextValue = {
  dices: DiceModel[];
  currentDice: DiceModel | null;
  currentLightSpotDice: DiceModel | null;
  rollDice: IRollDiceUsecase['execute'];
};

export interface DiceContextProviderProps extends ContextProviderProps {
  getDices: IGetDicesUsecase;
  watchDices: IWatchDicesUsecase;
  rollDice: IRollDiceUsecase;
}
