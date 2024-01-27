import { DatabaseGetPlayerUsecase } from '@data/usecases';
import { GetPlayerUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makePlayersTable } from '..';

export function makeDatabaseGetPlayerUsecase(): GetPlayerUsecase {
  const table = makePlayersTable();
  const database = makeFirebaseDatabase();

  return new DatabaseGetPlayerUsecase({ table, database });
}
