import { AuthSignInWithCredentialsUsecase } from '@data/usecases';
import { SignInWithCredentialsUsecase } from '@domain/usecases';

import {
  makeAuthCredentials,
  makeDatabase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthSignInWithCredentialsUsecase(): SignInWithCredentialsUsecase {
  const authCredentials = makeAuthCredentials();
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthSignInWithCredentialsUsecase({
    authCredentials,
    database,
    tableGenerator,
  });
}
