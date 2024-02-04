import { MockGetCurrentUserUsecase } from '@data/usecases';
import { GetCurrentUserUsecase } from '@domain/usecases';

import { makeDatabase, makeUsersTableGenerator } from '@main/factories';

export function makeMockGetCurrentUserUsecase(): GetCurrentUserUsecase {
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new MockGetCurrentUserUsecase({ database, tableGenerator });
}
