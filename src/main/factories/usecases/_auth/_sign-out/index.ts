import { ISignOutUsecase } from '@domain/usecases';

import { SignOutUsecase } from '@data/usecases';

import { makeSessionDestroyer } from '@main/factories';

export function makeSignOutUsecase(): ISignOutUsecase {
  const sessionDestroyer = makeSessionDestroyer();

  return new SignOutUsecase({
    sessionDestroyer,
  });
}
