import {
  ChangeUserUsecase,
  GetMeUsecase,
  SignInWithCredentialsUsecase,
  SignInWithProviderUsecase,
  SignOutUsecase,
  SignUpWithCredentialsUsecase,
  WatchMeUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signInWithProvider: SignInWithProviderUsecase;
  signOut: SignOutUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signInWithProvider: SignInWithProviderUsecase;
  signOut: SignOutUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeUser: ChangeUserUsecase;
}
