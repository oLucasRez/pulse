import { ISignOutUsecase } from '@domain/usecases';

import { SignOutUsecase } from '@data/usecases';

import { makeSessionDestroyer, makeSignOutPublisher } from '@main/factories';

export function makeSignOutUsecase(): ISignOutUsecase {
  const signOutPublisher = makeSignOutPublisher();
  const sessionDestroyer = makeSessionDestroyer();

  return new SignOutUsecase({
    signOutPublisher,
    sessionDestroyer,
  });
}
