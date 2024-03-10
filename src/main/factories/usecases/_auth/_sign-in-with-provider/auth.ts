import { AuthSignInWithProviderUsecase } from '@data/usecases';
import { SignInWithProviderUsecase } from '@domain/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeSignInPublisher,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignInWithProviderUsecase(): SignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const signInPublisher = makeSignInPublisher();
  const changeMe = makeChangeMeUsecase();
  const userCRUD = makeUserCRUD();

  return new AuthSignInWithProviderUsecase({
    authProvider,
    signInPublisher,
    changeMe,
    userCRUD,
  });
}
