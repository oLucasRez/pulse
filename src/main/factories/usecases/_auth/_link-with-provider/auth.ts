import { LinkWithProviderUsecase } from '@domain/usecases';

import { AuthLinkWithProviderUsecase } from '@data/usecases';

import {
  makeAuthProvider,
  makeChangeMePublisher,
  makeChangeMeUsecase,
  makeSignInWithProviderUsecase,
  makeUserDAO,
} from '@main/factories';

export function makeAuthLinkWithProviderUsecase(): LinkWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const changeMePublisher = makeChangeMePublisher();
  const changeMe = makeChangeMeUsecase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const userDAO = makeUserDAO();

  return new AuthLinkWithProviderUsecase({
    authProvider,
    changeMePublisher,
    changeMe,
    signInWithProvider,
    userDAO,
  });
}
