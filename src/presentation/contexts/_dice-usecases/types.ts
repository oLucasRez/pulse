import {
  ChangeDiceUsecase,
  CreateDiceUsecase,
  DeleteDiceUsecase,
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
  deleteDice: DeleteDiceUsecase;
};

export interface DiceUsecasesContextProviderProps extends ContextProviderProps {
  getDices: GetDicesUsecase;
  getDice: GetDiceUsecase;
  watchDices: WatchDicesUsecase;
  createDice: CreateDiceUsecase;
  changeDice: ChangeDiceUsecase;
  deleteDice: DeleteDiceUsecase;
}
