import { AuthSignInWithPasswordUsecase } from '@data/usecases';
import { SignInWithPasswordUsecase } from '@domain/usecases';

import {
  makeAuthPassword,
  makeDatabase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthSignInWithPasswordUsecase(): SignInWithPasswordUsecase {
  const authPassword = makeAuthPassword();
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthSignInWithPasswordUsecase({
    authPassword,
    database,
    tableGenerator,
  });
}
