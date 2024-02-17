import { AuthLinkWithProviderUsecase } from '@data/usecases';
import { LinkWithProviderUsecase } from '@domain/usecases';

import {
  makeAuthProvider,
  makeChangeMeUsecase,
  makeDatabase,
  makeSignInWithProviderUsecase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthLinkWithProviderUsecase(): LinkWithProviderUsecase {
  const authProvider = makeAuthProvider();
  const changeMe = makeChangeMeUsecase();
  const database = makeDatabase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthLinkWithProviderUsecase({
    authProvider,
    changeMe,
    database,
    signInWithProvider,
    tableGenerator,
  });
}
