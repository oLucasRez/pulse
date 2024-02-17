import { AuthSignInWithProviderUsecase } from '@data/usecases';
import { SignInWithProviderUsecase } from '@domain/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeDatabase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthSignInWithProviderUsecase(): SignInWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const changeMe = makeChangeMeUsecase();
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthSignInWithProviderUsecase({
    authProvider,
    changeMe,
    database,
    tableGenerator,
  });
}
