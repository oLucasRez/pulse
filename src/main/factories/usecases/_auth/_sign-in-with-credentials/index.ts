import { ISignInWithCredentialsUsecase } from '@domain/usecases';

import { SignInWithCredentialsUsecase } from '@data/usecases';

import {
  makeAuthCredentials,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeSignInWithCredentialsUsecase(): ISignInWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new SignInWithCredentialsUsecase({
    authCredentials,
    userDAO,
    userHydrator,
  });
}
