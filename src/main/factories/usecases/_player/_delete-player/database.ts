import { DatabaseDeletePlayerUsecase } from '@data/usecases';
import { DeletePlayerUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makePlayersTable } from '..';

export function makeDatabaseDeletePlayerUsecase(): DeletePlayerUsecase {
  const table = makePlayersTable();
  const database = makeFirebaseDatabase();

  return new DatabaseDeletePlayerUsecase({ table, database });
}
