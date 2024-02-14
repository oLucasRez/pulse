import { SignOutUsecase } from '@domain/usecases';

import { makeAuthSignOutUsecase } from './auth';

export function makeSignOutUsecase(): SignOutUsecase {
  return makeAuthSignOutUsecase();
}
