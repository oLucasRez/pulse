import { ILinkWithProviderUsecase } from '@domain/usecases';

import { LinkWithProviderUsecase } from '@data/usecases';

import {
  makeAuthProvider,
  makeChangeMePublisher,
  makeChangeMeUsecase,
  makeSignInWithProviderUsecase,
  makeUserDAO,
} from '@main/factories';

export function makeLinkWithProviderUsecase(): ILinkWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const changeMePublisher = makeChangeMePublisher();
  const changeMe = makeChangeMeUsecase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const userDAO = makeUserDAO();

  return new LinkWithProviderUsecase({
    authProvider,
    changeMePublisher,
    changeMe,
    signInWithProvider,
    userDAO,
  });
}
