import { AuthSignInWithCredentialsUsecase } from '@data/usecases';
import { SignInWithCredentialsUsecase } from '@domain/usecases';

import {
  makeAuthCredentials,
  makeSignInPublisher,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignInWithCredentialsUsecase(): SignInWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const signInPublisher = makeSignInPublisher();
  const userCRUD = makeUserCRUD();

  return new AuthSignInWithCredentialsUsecase({
    authCredentials,
    signInPublisher,
    userCRUD,
  });
}
