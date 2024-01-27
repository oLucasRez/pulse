import { DatabaseGetDiceUsecase } from '@data/usecases';
import { GetDiceUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makeDicesTable } from '..';

export function makeDatabaseGetDiceUsecase(): GetDiceUsecase {
  const table = makeDicesTable();
  const database = makeFirebaseDatabase();

  return new DatabaseGetDiceUsecase({ table, database });
}
