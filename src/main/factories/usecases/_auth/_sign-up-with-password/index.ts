import { SignUpWithPasswordUsecase } from '@domain/usecases';

import { makeAuthSignUpWithPasswordUsecase } from './auth';

export function makeSignUpWithPasswordUsecase(): SignUpWithPasswordUsecase {
  return makeAuthSignUpWithPasswordUsecase();
}
