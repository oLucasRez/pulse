import { DatabaseChangeDiceUsecase } from '@data/usecases';
import { ChangeDiceUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeDicesTableGenerator,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeDatabaseChangeDiceUsecase(): ChangeDiceUsecase {
  const database = makeDatabase();
  const tableGenerator = makeDicesTableGenerator();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new DatabaseChangeDiceUsecase({
    database,
    tableGenerator,
    getDice,
    getPlayer,
  });
}
