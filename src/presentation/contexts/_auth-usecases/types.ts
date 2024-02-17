import {
  ChangeMeUsecase,
  GetMeUsecase,
  LinkWithProviderUsecase,
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
}
