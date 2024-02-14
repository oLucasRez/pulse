import { AuthSignUpWithPasswordUsecase } from '@data/usecases';
import { SignUpWithPasswordUsecase } from '@domain/usecases';

import {
  makeAuthPassword,
  makeDatabase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthSignUpWithPasswordUsecase(): SignUpWithPasswordUsecase {
  const authPassword = makeAuthPassword();
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthSignUpWithPasswordUsecase({
    authPassword,
    database,
    tableGenerator,
  });
}
