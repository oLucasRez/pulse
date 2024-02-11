import { DatabaseGetCurrentGameUsecase } from '@data/usecases';
import { GetCurrentGameUsecase } from '@domain/usecases';

import {
  makeCache,
  makeDatabase,
  makeGamesTableGenerator,
  makeGetGameUsecase,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDatabaseGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const cache = makeCache();
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();

  return new DatabaseGetCurrentGameUsecase({
    cache,
    database,
    tableGenerator,
    getGame,
    getMe,
  });
}
