import { DiceModel } from '@domain/models';
import {
  IChangeDiceUsecase,
  RollDiceUsecase,
  WatchDicesUsecase,
} from '@domain/usecases';
import { Vector } from '@domain/utils';

import { ContextProviderProps } from '@presentation/types';

export type DiceUsecasesContextValue = {
  dices: DiceModel[];
  watchDices(
    callback?: WatchDicesUsecase.Callback,
  ): Promise<WatchDicesUsecase.Response>;
  rollDice: RollDiceUsecase['execute'];
  setDicePosition(id: string, position: Vector | null): Promise<DiceModel>;
};

export interface DiceUsecasesContextProviderProps extends ContextProviderProps {
  watchDices: WatchDicesUsecase;
  rollDice: RollDiceUsecase;
  changeDice: IChangeDiceUsecase;
}
