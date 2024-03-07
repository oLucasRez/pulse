import { AuthSignOutUsecase } from '@data/usecases';
import { SignOutUsecase } from '@domain/usecases';

import { makeAuthPublisher, makeSessionDestroyer } from '@main/factories';

export function makeAuthSignOutUsecase(): SignOutUsecase {
  const authPublisher = makeAuthPublisher();
  const sessionDestroyer = makeSessionDestroyer();

  return new AuthSignOutUsecase({
    authPublisher,
    sessionDestroyer,
  });
}
