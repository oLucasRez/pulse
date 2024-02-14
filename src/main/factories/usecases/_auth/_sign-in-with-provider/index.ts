import { SignInWithProviderUsecase } from '@domain/usecases';

import { makeAuthSignInWithProviderUsecase } from './auth';

export function makeSignInWithProviderUsecase(): SignInWithProviderUsecase {
  return makeAuthSignInWithProviderUsecase();
}
