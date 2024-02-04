import { DatabaseDeleteGameUsecase } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import { makeDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseDeleteGameUsecase(): DeleteGameUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseDeleteGameUsecase({ database, tableGenerator });
}
