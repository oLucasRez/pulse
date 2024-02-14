import { SignInWithPasswordUsecase } from '@domain/usecases';

import { makeAuthSignInWithPasswordUsecase } from './auth';

export function makeSignInWithPasswordUsecase(): SignInWithPasswordUsecase {
  return makeAuthSignInWithPasswordUsecase();
}
