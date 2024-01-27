import { DatabaseCreateDiceUsecase } from '@data/usecases';
import { CreateDiceUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makeDicesTable } from '..';

export function makeDatabaseCreateDiceUsecase(): CreateDiceUsecase {
  const table = makeDicesTable();
  const database = makeFirebaseDatabase();

  return new DatabaseCreateDiceUsecase({ table, database });
}
