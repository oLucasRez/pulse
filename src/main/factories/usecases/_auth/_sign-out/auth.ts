import { AuthSignOutUsecase } from '@data/usecases';
import { SignOutUsecase } from '@domain/usecases';

import { makeSessionDestroyer } from '@main/factories';

export function makeAuthSignOutUsecase(): SignOutUsecase {
  const sessionDestroyer = makeSessionDestroyer();

  return new AuthSignOutUsecase({
    sessionDestroyer,
  });
}
