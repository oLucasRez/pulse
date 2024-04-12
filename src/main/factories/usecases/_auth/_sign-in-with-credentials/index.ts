import { ISignInWithCredentialsUsecase } from '@domain/usecases';

import { SignInWithCredentialsUsecase } from '@data/usecases';

import {
  makeAuthCredentials,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeSignInWithCredentialsUsecase(): ISignInWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const signInPublisher = makeSignInPublisher();
  const userDAO = makeUserDAO();

  return new SignInWithCredentialsUsecase({
    authCredentials,
    signInPublisher,
    userDAO,
  });
}
