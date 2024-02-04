import { DatabaseGetGameUsecase } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import { makeDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseGetGameUsecase(): GetGameUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseGetGameUsecase({ database, tableGenerator });
}
