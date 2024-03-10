import { DiceModel } from '@domain/models';
import { WatchDicesUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type DiceUsecasesContextValue = {
  dices: DiceModel[];
};

export interface DiceUsecasesContextProviderProps extends ContextProviderProps {
  watchDices: WatchDicesUsecase;
}
