import { DatabaseDeletePlayerUsecase } from '@data/usecases';
import { DeletePlayerUsecase } from '@domain/usecases';

import { makeDatabase, makePlayersTableGenerator } from '@main/factories';

export function makeDatabaseDeletePlayerUsecase(): DeletePlayerUsecase {
  const database = makeDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseDeletePlayerUsecase({
    database,
    tableGenerator,
  });
}
