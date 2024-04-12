import { UserModel } from '@domain/models';
import {
  IGetMeUsecase,
  ILinkWithProviderUsecase,
  ISignInAnonymouslyUsecase,
  ISignInWithCredentialsUsecase,
  ISignInWithProviderUsecase,
  ISignOutUsecase,
  ISignUpWithCredentialsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  me: UserModel | null;
  fetchMe: IGetMeUsecase['execute'];
  signUpWithCredentials: ISignUpWithCredentialsUsecase['execute'];
  signInWithCredentials: ISignInWithCredentialsUsecase['execute'];
  signInWithProvider: ISignInWithProviderUsecase['execute'];
  linkWithProvider: ILinkWithProviderUsecase['execute'];
  signInAnonymously: ISignInAnonymouslyUsecase['execute'];
  signOut: ISignOutUsecase['execute'];
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  getMe: IGetMeUsecase;
  signUpWithCredentials: ISignUpWithCredentialsUsecase;
  signInWithCredentials: ISignInWithCredentialsUsecase;
  signInWithProvider: ISignInWithProviderUsecase;
  linkWithProvider: ILinkWithProviderUsecase;
  signInAnonymously: ISignInAnonymouslyUsecase;
  signOut: ISignOutUsecase;
}
