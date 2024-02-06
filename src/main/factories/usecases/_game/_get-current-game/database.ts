import { DatabaseGetCurrentGameUsecase } from '@data/usecases';
import { GetCurrentGameUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGamesTableGenerator,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDatabaseGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getMe = makeGetMeUsecase();

  return new DatabaseGetCurrentGameUsecase({
    database,
    tableGenerator,
    getMe,
  });
}
