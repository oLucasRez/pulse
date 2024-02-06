import { DatabaseChangeUserUsecase } from '@data/usecases';
import { ChangeUserUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMeUsecase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeDatabaseChangeUserUsecase(): ChangeUserUsecase {
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const tableGenerator = makeUsersTableGenerator();

  return new DatabaseChangeUserUsecase({
    database,
    getMe,
    tableGenerator,
  });
}
