import { ISignInAnonymouslyUsecase } from '@domain/usecases';

import { SignInAnonymouslyUsecase } from '@data/usecases';

import {
  makeAuthAnonymous,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeSignInAnonymouslyUsecase(): ISignInAnonymouslyUsecase {
  const authAnonymous = makeAuthAnonymous();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new SignInAnonymouslyUsecase({
    authAnonymous,
    userDAO,
    userHydrator,
  });
}
