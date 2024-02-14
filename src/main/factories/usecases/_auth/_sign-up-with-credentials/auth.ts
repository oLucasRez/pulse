import { AuthSignUpWithCredentialsUsecase } from '@data/usecases';
import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import {
  makeAuthCredentials,
  makeDatabase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthSignUpWithCredentialsUsecase(): SignUpWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthSignUpWithCredentialsUsecase({
    authCredentials,
    database,
    tableGenerator,
  });
}
