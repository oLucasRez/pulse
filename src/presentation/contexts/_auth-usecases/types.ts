import {
  LinkWithProviderUsecase,
  SignInAnonymouslyUsecase,
  SignInWithCredentialsUsecase,
  SignInWithProviderUsecase,
  SignOutUsecase,
  SignUpWithCredentialsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signInWithProvider: SignInWithProviderUsecase;
  linkWithProvider: LinkWithProviderUsecase;
  signInAnonymously: SignInAnonymouslyUsecase;
  signOut: SignOutUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signInWithProvider: SignInWithProviderUsecase;
  linkWithProvider: LinkWithProviderUsecase;
  signInAnonymously: SignInAnonymouslyUsecase;
  signOut: SignOutUsecase;
}
