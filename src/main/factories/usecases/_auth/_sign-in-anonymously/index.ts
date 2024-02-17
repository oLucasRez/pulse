import { SignInAnonymouslyUsecase } from '@domain/usecases';

import { makeAuthSignInAnonymouslyUsecase } from './auth';

export function makeSignInAnonymouslyUsecase(): SignInAnonymouslyUsecase {
  return makeAuthSignInAnonymouslyUsecase();
}
