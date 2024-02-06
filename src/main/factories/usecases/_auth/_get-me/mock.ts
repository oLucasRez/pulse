import { MockGetMeUsecase } from '@data/usecases';
import { GetMeUsecase } from '@domain/usecases';

import { makeDatabase, makeUsersTableGenerator } from '@main/factories';

export function makeMockGetMeUsecase(): GetMeUsecase {
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new MockGetMeUsecase({ database, tableGenerator });
}
