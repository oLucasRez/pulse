import { AuthSignUpWithCredentialsUsecase } from '@data/usecases';
import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import {
  makeAuthCredentials,
  makeAuthPublisher,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignUpWithCredentialsUsecase(): SignUpWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const authPublisher = makeAuthPublisher();
  const userCRUD = makeUserCRUD();

  return new AuthSignUpWithCredentialsUsecase({
    authCredentials,
    authPublisher,
    userCRUD,
  });
}
