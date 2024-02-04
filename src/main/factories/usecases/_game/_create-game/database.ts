import { DatabaseCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGamesTableGenerator,
  makeGetCurrentUserUsecase,
} from '@main/factories';

export function makeDatabaseCreateGameUsecase(): CreateGameUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getCurrentUser = makeGetCurrentUserUsecase();

  return new DatabaseCreateGameUsecase({
    database,
    tableGenerator,
    getCurrentUser,
  });
}
