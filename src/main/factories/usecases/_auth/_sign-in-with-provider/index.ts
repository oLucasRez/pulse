import { ISignInWithProviderUsecase } from '@domain/usecases';

import { SignInWithProviderUsecase } from '@data/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeSignInWithProviderUsecase(): ISignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const changeMe = makeChangeMeUsecase();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new SignInWithProviderUsecase({
    authProvider,
    changeMe,
    userDAO,
    userHydrator,
  });
}
