import { AuthGetMeUsecase } from '@data/usecases';
import { GetMeUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeSessionGetter,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeAuthGetMeUsecase(): GetMeUsecase {
  const database = makeDatabase();
  const sessionGetter = makeSessionGetter();
  const tableGenerator = makeUsersTableGenerator();

  return new AuthGetMeUsecase({ database, sessionGetter, tableGenerator });
}
