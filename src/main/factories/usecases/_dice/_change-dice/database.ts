import { DatabaseChangeDiceUsecase } from '@data/usecases';
import { ChangeDiceUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories';

import { makeDatabaseGetDiceUsecase, makeDicesTableGenerator } from '..';
import { makeDatabaseGetPlayerUsecase } from '../..';

export function makeDatabaseChangeDiceUsecase(): ChangeDiceUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const database = makeFirebaseDatabase();
  const getDice = makeDatabaseGetDiceUsecase();
  const getPlayer = makeDatabaseGetPlayerUsecase();

  return new DatabaseChangeDiceUsecase({
    tableGenerator,
    database,
    getDice,
    getPlayer,
  });
}
