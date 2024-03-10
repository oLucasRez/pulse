import { SignInWithCredentialsUsecase } from '@domain/usecases';

import { AuthSignInWithCredentialsUsecase } from '@data/usecases';

import {
  makeAuthCredentials,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeAuthSignInWithCredentialsUsecase(): SignInWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const signInPublisher = makeSignInPublisher();
  const userDAO = makeUserDAO();

  return new AuthSignInWithCredentialsUsecase({
    authCredentials,
    signInPublisher,
    userDAO,
  });
}
