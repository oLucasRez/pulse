import {
  ChangeUserUsecase,
  GetMeUsecase,
  SignUpWithPasswordUsecase,
  WatchMeUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  signUpWithPassword: SignUpWithPasswordUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  signUpWithPassword: SignUpWithPasswordUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
}
