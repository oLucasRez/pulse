import { DatabaseGetPlayerUsecase } from '@data/usecases';
import { GetPlayerUsecase } from '@domain/usecases';

import { makeDatabase, makePlayersTableGenerator } from '@main/factories';

export function makeDatabaseGetPlayerUsecase(): GetPlayerUsecase {
  const database = makeDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseGetPlayerUsecase({ database, tableGenerator });
}
