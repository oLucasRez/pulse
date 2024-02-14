import { SignInWithCredentialsUsecase } from '@domain/usecases';

import { makeAuthSignInWithCredentialsUsecase } from './auth';

export function makeSignInWithCredentialsUsecase(): SignInWithCredentialsUsecase {
  return makeAuthSignInWithCredentialsUsecase();
}
