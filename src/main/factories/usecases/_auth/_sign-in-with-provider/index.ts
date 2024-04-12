import { ISignInWithProviderUsecase } from '@domain/usecases';

import { SignInWithProviderUsecase } from '@data/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeSignInWithProviderUsecase(): ISignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const signInPublisher = makeSignInPublisher();
  const changeMe = makeChangeMeUsecase();
  const userDAO = makeUserDAO();

  return new SignInWithProviderUsecase({
    authProvider,
    signInPublisher,
    changeMe,
    userDAO,
  });
}
