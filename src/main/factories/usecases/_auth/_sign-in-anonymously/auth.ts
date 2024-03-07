import { AuthSignInAnonymouslyUsecase } from '@data/usecases';
import { SignInAnonymouslyUsecase } from '@domain/usecases';

import {
  makeAuthAnonymous,
  makeAuthPublisher,
  makeUserCRUD,
} from '@main/factories';

export function makeAuthSignInAnonymouslyUsecase(): SignInAnonymouslyUsecase {
  const authAnonymous = makeAuthAnonymous();
  const authPublisher = makeAuthPublisher();
  const userCRUD = makeUserCRUD();

  return new AuthSignInAnonymouslyUsecase({
    authAnonymous,
    authPublisher,
    userCRUD,
  });
}
