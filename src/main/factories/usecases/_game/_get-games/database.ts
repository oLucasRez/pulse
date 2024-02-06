import { DatabaseGetGamesUsecase } from '@data/usecases';
import { GetGamesUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGamesTableGenerator,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDatabaseGetGamesUsecase(): GetGamesUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getMe = makeGetMeUsecase();

  return new DatabaseGetGamesUsecase({
    database,
    tableGenerator,
    getMe,
  });
}
