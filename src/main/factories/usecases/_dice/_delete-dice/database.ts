import { DatabaseDeleteDiceUsecase } from '@data/usecases';
import { DeleteDiceUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makeDicesTable } from '..';

export function makeDatabaseDeleteDiceUsecase(): DeleteDiceUsecase {
  const table = makeDicesTable();
  const database = makeFirebaseDatabase();

  return new DatabaseDeleteDiceUsecase({ table, database });
}
