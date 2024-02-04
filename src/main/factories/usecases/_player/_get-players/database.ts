import { DatabaseGetPlayersUsecase } from '@data/usecases';
import { GetPlayersUsecase } from '@domain/usecases';

import { makeDatabase, makePlayersTableGenerator } from '@main/factories';

export function makeDatabaseGetPlayersUsecase(): GetPlayersUsecase {
  const database = makeDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseGetPlayersUsecase({ database, tableGenerator });
}
