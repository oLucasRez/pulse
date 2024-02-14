import { AuthSignInWithProviderUsecase } from '@data/usecases';
import { SignInWithProviderUsecase } from '@domain/usecases';

import {
  makeAuthProvider,
  makeDatabase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthSignInWithProviderUsecase(): SignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthSignInWithProviderUsecase({
    authProvider,
    database,
    tableGenerator,
  });
}
