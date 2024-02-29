import { AuthSignInWithProviderUsecase } from '@data/usecases';
import { SignInWithProviderUsecase } from '@domain/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignInWithProviderUsecase(): SignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const changeMe = makeChangeMeUsecase();
  const userCRUD = makeUserCRUD();

  return new AuthSignInWithProviderUsecase({
    authProvider,
    changeMe,
    userCRUD,
  });
}
