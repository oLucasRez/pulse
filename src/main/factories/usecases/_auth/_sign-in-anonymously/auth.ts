import { AuthSignInAnonymouslyUsecase } from '@data/usecases';
import { SignInAnonymouslyUsecase } from '@domain/usecases';

import { makeAuthAnonymous, makeUserCRUD } from '@main/factories';

export function makeAuthSignInAnonymouslyUsecase(): SignInAnonymouslyUsecase {
  const authAnonymous = makeAuthAnonymous();
  const userCRUD = makeUserCRUD();

  return new AuthSignInAnonymouslyUsecase({
    authAnonymous,
    userCRUD,
  });
}
