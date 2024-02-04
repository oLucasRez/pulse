import { DatabaseChangeUserUsecase } from '@data/usecases';
import { ChangeUserUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetCurrentUserUsecase,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeDatabaseChangeUserUsecase(): ChangeUserUsecase {
  const database = makeDatabase();
  const getCurrentUser = makeGetCurrentUserUsecase();
  const tableGenerator = makeUsersTableGenerator();

  return new DatabaseChangeUserUsecase({
    database,
    getCurrentUser,
    tableGenerator,
  });
}
