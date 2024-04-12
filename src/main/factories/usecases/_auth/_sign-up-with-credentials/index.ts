import { ISignUpWithCredentialsUsecase } from '@domain/usecases';

import { SignUpWithCredentialsUsecase } from '@data/usecases';

import {
  makeAuthCredentials,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeSignUpWithCredentialsUsecase(): ISignUpWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const signInPublisher = makeSignInPublisher();
  const userDAO = makeUserDAO();

  return new SignUpWithCredentialsUsecase({
    authCredentials,
    signInPublisher,
    userDAO,
  });
}
