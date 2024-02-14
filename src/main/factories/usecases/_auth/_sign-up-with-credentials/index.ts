import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import { makeAuthSignUpWithCredentialsUsecase } from './auth';

export function makeSignUpWithCredentialsUsecase(): SignUpWithCredentialsUsecase {
  return makeAuthSignUpWithCredentialsUsecase();
}
