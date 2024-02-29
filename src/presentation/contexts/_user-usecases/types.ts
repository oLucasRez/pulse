import {
  ChangeMeUsecase,
  GetMeUsecase,
  SetCurrentGameUsecase,
  WatchMeUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type UserUsecasesContextValue = {
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeMe: ChangeMeUsecase;
  setCurrentGame: SetCurrentGameUsecase;
};

export interface UserUsecasesContextProviderProps extends ContextProviderProps {
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeMe: ChangeMeUsecase;
  setCurrentGame: SetCurrentGameUsecase;
}
