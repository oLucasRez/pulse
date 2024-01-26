import { DatabaseChangePlayerUsecase } from '@data/usecases';
import { ChangePlayerUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makePlayersTable } from '..';

export function makeDatabaseChangePlayerUsecase(): ChangePlayerUsecase {
  const table = makePlayersTable();
  const database = makeFirebaseDatabase();

  return new DatabaseChangePlayerUsecase(table, database);
}
