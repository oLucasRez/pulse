import { AuthSignInAnonymouslyUsecase } from '@data/usecases';
import { SignInAnonymouslyUsecase } from '@domain/usecases';

import {
  makeAuthAnonymous,
  makeDatabase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthSignInAnonymouslyUsecase(): SignInAnonymouslyUsecase {
  const authAnonymous = makeAuthAnonymous();
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthSignInAnonymouslyUsecase({
    authAnonymous,
    database,
    tableGenerator,
  });
}
