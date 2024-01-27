import { DatabaseChangeDiceUsecase } from '@data/usecases';
import { ChangeDiceUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makeDatabaseGetDiceUsecase, makeDicesTable } from '..';
import { makeDatabaseGetPlayerUsecase } from '../..';

export function makeDatabaseChangeDiceUsecase(): ChangeDiceUsecase {
  const table = makeDicesTable();
  const database = makeFirebaseDatabase();
  const getDice = makeDatabaseGetDiceUsecase();
  const getPlayer = makeDatabaseGetPlayerUsecase();

  return new DatabaseChangeDiceUsecase({ table, database, getDice, getPlayer });
}
