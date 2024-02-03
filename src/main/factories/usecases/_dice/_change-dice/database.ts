import { DatabaseChangeDiceUsecase } from '@data/usecases';
import { ChangeDiceUsecase } from '@domain/usecases';

import {
  makeDicesTableGenerator,
  makeFirebaseDatabase,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeDatabaseChangeDiceUsecase(): ChangeDiceUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const database = makeFirebaseDatabase();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new DatabaseChangeDiceUsecase({
    tableGenerator,
    database,
    getDice,
    getPlayer,
  });
}
