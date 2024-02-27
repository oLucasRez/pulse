import { DatabaseSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMeUsecase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeDatabaseSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const tableGenerator = makeUsersTableGenerator();

  return new DatabaseSetCurrentGameUsecase({
    database,
    getMe,
    tableGenerator,
  });
}
