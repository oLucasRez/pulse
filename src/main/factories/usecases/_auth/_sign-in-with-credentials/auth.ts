import { AuthSignInWithCredentialsUsecase } from '@data/usecases';
import { SignInWithCredentialsUsecase } from '@domain/usecases';

import {
  makeAuthCredentials,
  makeAuthPublisher,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignInWithCredentialsUsecase(): SignInWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const authPublisher = makeAuthPublisher();
  const userCRUD = makeUserCRUD();

  return new AuthSignInWithCredentialsUsecase({
    authCredentials,
    authPublisher,
    userCRUD,
  });
}
