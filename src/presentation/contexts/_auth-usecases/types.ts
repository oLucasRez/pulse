import {
  ChangeUserUsecase,
  GetMeUsecase,
  WatchMeUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
}
