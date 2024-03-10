import { AuthSignOutUsecase } from '@data/usecases';
import { SignOutUsecase } from '@domain/usecases';

import { makeSessionDestroyer, makeSignOutPublisher } from '@main/factories';

export function makeAuthSignOutUsecase(): SignOutUsecase {
  const signOutPublisher = makeSignOutPublisher();
  const sessionDestroyer = makeSessionDestroyer();

  return new AuthSignOutUsecase({
    signOutPublisher,
    sessionDestroyer,
  });
}
