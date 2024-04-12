import { DiceModel } from '@domain/models';
import {
  IChangeDiceUsecase,
  IRollDiceUsecase,
  IWatchDicesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type DiceUsecasesContextValue = {
  dices: DiceModel[];
  watchDices(
    callback?: IWatchDicesUsecase.Callback,
  ): Promise<IWatchDicesUsecase.Response>;
  rollDice: IRollDiceUsecase['execute'];
};

export interface DiceUsecasesContextProviderProps extends ContextProviderProps {
  watchDices: IWatchDicesUsecase;
  rollDice: IRollDiceUsecase;
  changeDice: IChangeDiceUsecase;
}
