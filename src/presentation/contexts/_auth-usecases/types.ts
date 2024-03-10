import { UserModel } from '@domain/models';
import {
  GetMeUsecase,
  LinkWithProviderUsecase,
  SignInAnonymouslyUsecase,
  SignInWithCredentialsUsecase,
  SignInWithProviderUsecase,
  SignOutUsecase,
  SignUpWithCredentialsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  me: UserModel | null;
  fetchMe: GetMeUsecase['execute'];
  signUpWithCredentials: SignUpWithCredentialsUsecase['execute'];
  signInWithCredentials: SignInWithCredentialsUsecase['execute'];
  signInWithProvider: SignInWithProviderUsecase['execute'];
  linkWithProvider: LinkWithProviderUsecase['execute'];
  signInAnonymously: SignInAnonymouslyUsecase['execute'];
  signOut: SignOutUsecase['execute'];
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  getMe: GetMeUsecase;
  signUpWithCredentials: SignUpWithCredentialsUsecase;
  signInWithCredentials: SignInWithCredentialsUsecase;
  signInWithProvider: SignInWithProviderUsecase;
  linkWithProvider: LinkWithProviderUsecase;
  signInAnonymously: SignInAnonymouslyUsecase;
  signOut: SignOutUsecase;
}
