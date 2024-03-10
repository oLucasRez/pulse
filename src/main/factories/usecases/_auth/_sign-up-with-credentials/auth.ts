import { AuthSignUpWithCredentialsUsecase } from '@data/usecases';
import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import {
  makeAuthCredentials,
  makeSignInPublisher,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignUpWithCredentialsUsecase(): SignUpWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const signInPublisher = makeSignInPublisher();
  const userCRUD = makeUserCRUD();

  return new AuthSignUpWithCredentialsUsecase({
    authCredentials,
    signInPublisher,
    userCRUD,
  });
}
