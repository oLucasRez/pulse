import { AuthSignInWithProviderUsecase } from '@data/usecases';
import { SignInWithProviderUsecase } from '@domain/usecases';

import {
  makeAuthProvider,
  makeAuthPublisher,
  makeChangeMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignInWithProviderUsecase(): SignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const authPublisher = makeAuthPublisher();
  const changeMe = makeChangeMeUsecase();
  const userCRUD = makeUserCRUD();

  return new AuthSignInWithProviderUsecase({
    authProvider,
    authPublisher,
    changeMe,
    userCRUD,
  });
}
