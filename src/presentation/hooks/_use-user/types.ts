import { DomainError } from '@domain/errors';
import { UserModel } from '@domain/models';
import {
  IChangeMeUsecase,
  IGetMeUsecase,
  ILinkWithProviderUsecase,
  ISetCurrentGameUsecase,
  ISignInAnonymouslyUsecase,
  ISignInWithCredentialsUsecase,
  ISignInWithProviderUsecase,
  ISignOutUsecase,
  ISignUpWithCredentialsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type UserContextValue = {
  me: UserModel | null;
  fetchingMe: boolean;
  error: DomainError | null;
  signUpWithCredentials: ISignUpWithCredentialsUsecase['execute'];
  signInWithCredentials: ISignInWithCredentialsUsecase['execute'];
  signInWithProvider: ISignInWithProviderUsecase['execute'];
  linkWithProvider: ILinkWithProviderUsecase['execute'];
  signInAnonymously: ISignInAnonymouslyUsecase['execute'];
  signOut: ISignOutUsecase['execute'];
  changeMe: IChangeMeUsecase['execute'];
  setCurrentGame: ISetCurrentGameUsecase['execute'];
};

export interface UserContextProviderProps extends ContextProviderProps {
  getMe: IGetMeUsecase;
  signUpWithCredentials: ISignUpWithCredentialsUsecase;
  signInWithCredentials: ISignInWithCredentialsUsecase;
  signInWithProvider: ISignInWithProviderUsecase;
  linkWithProvider: ILinkWithProviderUsecase;
  signInAnonymously: ISignInAnonymouslyUsecase;
  signOut: ISignOutUsecase;
  changeMe: IChangeMeUsecase;
  setCurrentGame: ISetCurrentGameUsecase;
}
