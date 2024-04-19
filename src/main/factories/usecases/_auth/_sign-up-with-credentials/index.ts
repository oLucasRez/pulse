import { ISignUpWithCredentialsUsecase } from '@domain/usecases';

import { SignUpWithCredentialsUsecase } from '@data/usecases';

import {
  makeAuthCredentials,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeSignUpWithCredentialsUsecase(): ISignUpWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new SignUpWithCredentialsUsecase({
    authCredentials,
    userDAO,
    userHydrator,
  });
}
