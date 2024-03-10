import { SignInAnonymouslyUsecase } from '@domain/usecases';

import { AuthSignInAnonymouslyUsecase } from '@data/usecases';

import {
  makeAuthAnonymous,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeAuthSignInAnonymouslyUsecase(): SignInAnonymouslyUsecase {
  const authAnonymous = makeAuthAnonymous();
  const signInPublisher = makeSignInPublisher();
  const userDAO = makeUserDAO();

  return new AuthSignInAnonymouslyUsecase({
    authAnonymous,
    signInPublisher,
    userDAO,
  });
}
