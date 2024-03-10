import { SignInWithProviderUsecase } from '@domain/usecases';

import { AuthSignInWithProviderUsecase } from '@data/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeAuthSignInWithProviderUsecase(): SignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const signInPublisher = makeSignInPublisher();
  const changeMe = makeChangeMeUsecase();
  const userDAO = makeUserDAO();

  return new AuthSignInWithProviderUsecase({
    authProvider,
    signInPublisher,
    changeMe,
    userDAO,
  });
}
