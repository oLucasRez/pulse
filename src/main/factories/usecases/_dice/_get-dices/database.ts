import { DatabaseGetDicesUsecase } from '@data/usecases';
import { GetDicesUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makeDicesTable } from '..';

export function makeDatabaseGetDicesUsecase(): GetDicesUsecase {
  const table = makeDicesTable();
  const database = makeFirebaseDatabase();

  return new DatabaseGetDicesUsecase({ table, database });
}
