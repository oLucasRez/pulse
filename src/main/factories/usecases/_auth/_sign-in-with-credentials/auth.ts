import { AuthSignInWithCredentialsUsecase } from '@data/usecases';
import { SignInWithCredentialsUsecase } from '@domain/usecases';

import { makeAuthCredentials, makeUserCRUD } from '@main/factories';

export function makeAuthSignInWithCredentialsUsecase(): SignInWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const userCRUD = makeUserCRUD();

  return new AuthSignInWithCredentialsUsecase({
    authCredentials,
    userCRUD,
  });
}
