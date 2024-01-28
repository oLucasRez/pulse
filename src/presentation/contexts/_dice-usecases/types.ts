import {
  ChangeDiceUsecase,
  CreateDiceUsecase,
  GetDicesUsecase,
  GetDiceUsecase,
  WatchDicesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type DiceUsecasesContextValue = {
  getDices: GetDicesUsecase;
  getDice: GetDiceUsecase;
  watchDices: WatchDicesUsecase;
  createDice: CreateDiceUsecase;
  changeDice: ChangeDiceUsecase;
};

export interface DiceUsecasesContextProviderProps extends ContextProviderProps {
  getDices: GetDicesUsecase;
  getDice: GetDiceUsecase;
  watchDices: WatchDicesUsecase;
  createDice: CreateDiceUsecase;
  changeDice: ChangeDiceUsecase;
}
