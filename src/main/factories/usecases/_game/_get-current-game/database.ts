import { DatabaseGetCurrentGameUsecase } from '@data/usecases';
import { GetCurrentGameUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGamesTableGenerator,
  makeGetCurrentUserUsecase,
} from '@main/factories';

export function makeDatabaseGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getCurrentUser = makeGetCurrentUserUsecase();

  return new DatabaseGetCurrentGameUsecase({
    database,
    tableGenerator,
    getCurrentUser,
  });
}
