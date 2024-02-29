import { AuthSignUpWithCredentialsUsecase } from '@data/usecases';
import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import { makeAuthCredentials, makeUserCRUD } from '@main/factories';

export function makeAuthSignUpWithCredentialsUsecase(): SignUpWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const userCRUD = makeUserCRUD();

  return new AuthSignUpWithCredentialsUsecase({
    authCredentials,
    userCRUD,
  });
}
