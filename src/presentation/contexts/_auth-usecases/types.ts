import {
  ChangeUserUsecase,
  GetMeUsecase,
  SignInWithPasswordUsecase,
  SignUpWithPasswordUsecase,
  WatchMeUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  signUpWithPassword: SignUpWithPasswordUsecase;
  signInWithPassword: SignInWithPasswordUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  signUpWithPassword: SignUpWithPasswordUsecase;
  signInWithPassword: SignInWithPasswordUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
}
