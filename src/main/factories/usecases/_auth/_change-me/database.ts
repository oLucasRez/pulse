import { DatabaseChangeMeUsecase } from '@data/usecases';
import { ChangeMeUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMeUsecase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeDatabaseChangeMeUsecase(): ChangeMeUsecase {
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const tableGenerator = makeUsersTableGenerator();

  return new DatabaseChangeMeUsecase({
    database,
    getMe,
    tableGenerator,
  });
}
