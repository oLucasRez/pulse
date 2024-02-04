import { DatabaseGetDiceUsecase } from '@data/usecases';
import { GetDiceUsecase } from '@domain/usecases';

import { makeDatabase, makeDicesTableGenerator } from '@main/factories';

export function makeDatabaseGetDiceUsecase(): GetDiceUsecase {
  const database = makeDatabase();
  const tableGenerator = makeDicesTableGenerator();

  return new DatabaseGetDiceUsecase({ database, tableGenerator });
}
