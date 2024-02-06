import { DatabaseCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGamesTableGenerator,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDatabaseCreateGameUsecase(): CreateGameUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getMe = makeGetMeUsecase();

  return new DatabaseCreateGameUsecase({
    database,
    tableGenerator,
    getMe,
  });
}
