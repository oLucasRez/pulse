import { AuthSignInAnonymouslyUsecase } from '@data/usecases';
import { SignInAnonymouslyUsecase } from '@domain/usecases';

import {
  makeAuthAnonymous,
  makeSignInPublisher,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignInAnonymouslyUsecase(): SignInAnonymouslyUsecase {
  const authAnonymous = makeAuthAnonymous();
  const signInPublisher = makeSignInPublisher();
  const userCRUD = makeUserCRUD();

  return new AuthSignInAnonymouslyUsecase({
    authAnonymous,
    signInPublisher,
    userCRUD,
  });
}
