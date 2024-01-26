import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makePlayersTable } from '..';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const table = makePlayersTable();
  const database = makeFirebaseDatabase();

  return new DatabaseCreatePlayerUsecase(table, database);
}
