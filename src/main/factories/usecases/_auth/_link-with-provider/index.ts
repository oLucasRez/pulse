import { ILinkWithProviderUsecase } from '@domain/usecases';

import { LinkWithProviderUsecase } from '@data/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeSignInWithProviderUsecase,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeLinkWithProviderUsecase(): ILinkWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const changeMe = makeChangeMeUsecase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new LinkWithProviderUsecase({
    authProvider,
    changeMe,
    signInWithProvider,
    userDAO,
    userHydrator,
  });
}
