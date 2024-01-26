import { DatabaseGetPlayersUsecase } from '@data/usecases';
import { GetPlayersUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makePlayersTable } from '..';

export function makeDatabaseGetPlayersUsecase(): GetPlayersUsecase {
  const table = makePlayersTable();
  const database = makeFirebaseDatabase();

  return new DatabaseGetPlayersUsecase(table, database);
}
