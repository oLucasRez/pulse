import {
  ChangeMeUsecase,
  GetMeUsecase,
  LinkWithProviderUsecase,
  SetCurrentGameUsecase,
  SignInAnonymouslyUsecase,
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
  linkWithProvider: LinkWithProviderUsecase;
  signInAnonymously: SignInAnonymouslyUsecase;
  signOut: SignOutUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeMe: ChangeMeUsecase;
  setCurrentGame: SetCurrentGameUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signInWithProvider: SignInWithProviderUsecase;
  linkWithProvider: LinkWithProviderUsecase;
  signInAnonymously: SignInAnonymouslyUsecase;
  signOut: SignOutUsecase;
  getMe: GetMeUsecase;
  watchMe: WatchMeUsecase;
  changeMe: ChangeMeUsecase;
  setCurrentGame: SetCurrentGameUsecase;
}
