import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import { AuthSignUpWithCredentialsUsecase } from '@data/usecases';

import {
  makeAuthCredentials,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeAuthSignUpWithCredentialsUsecase(): SignUpWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const signInPublisher = makeSignInPublisher();
  const userDAO = makeUserDAO();

  return new AuthSignUpWithCredentialsUsecase({
    authCredentials,
    signInPublisher,
    userDAO,
  });
}
