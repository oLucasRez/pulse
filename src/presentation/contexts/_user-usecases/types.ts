import { UserModel } from '@domain/models';

import {
  ChangeMeUsecase,
  GetMeUsecase,
  SetCurrentGameUsecase,
  WatchMeUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type UserUsecasesContextValue = {
  changeMe: ChangeMeUsecase['execute'];
  setCurrentGame: SetCurrentGameUsecase['execute'];

  me: UserModel | null;
  fetchingMe: boolean;
};

export interface UserUsecasesContextProviderProps extends ContextProviderProps {
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeMe: ChangeMeUsecase;
  setCurrentGame: SetCurrentGameUsecase;
}
