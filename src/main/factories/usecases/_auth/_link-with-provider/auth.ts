import { AuthLinkWithProviderUsecase } from '@data/usecases';
import { LinkWithProviderUsecase } from '@domain/usecases';

import {
  makeAuthProvider,
  makeAuthPublisher,
  makeChangeMeUsecase,
  makeSignInWithProviderUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthLinkWithProviderUsecase(): LinkWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const authPublisher = makeAuthPublisher();
  const changeMe = makeChangeMeUsecase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const userCRUD = makeUserCRUD();

  return new AuthLinkWithProviderUsecase({
    authProvider,
    authPublisher,
    changeMe,
    signInWithProvider,
    userCRUD,
  });
}
