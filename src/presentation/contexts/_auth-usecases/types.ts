import {
  ChangeUserUsecase,
  GetMeUsecase,
  SignInWithCredentialsUsecase,
  SignOutUsecase,
  SignUpWithCredentialsUsecase,
  WatchMeUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signOut: SignOutUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signOut: SignOutUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
}
