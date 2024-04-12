import { ISignInAnonymouslyUsecase } from '@domain/usecases';

import { SignInAnonymouslyUsecase } from '@data/usecases';

import {
  makeAuthAnonymous,
  makeSignInPublisher,
  makeUserDAO,
} from '@main/factories';

export function makeSignInAnonymouslyUsecase(): ISignInAnonymouslyUsecase {
  const authAnonymous = makeAuthAnonymous();
  const signInPublisher = makeSignInPublisher();
  const userDAO = makeUserDAO();

  return new SignInAnonymouslyUsecase({
    authAnonymous,
    signInPublisher,
    userDAO,
  });
}
