import { DatabaseCreateDiceUsecase } from '@data/usecases';
import { CreateDiceUsecase } from '@domain/usecases';

import { makeDatabase, makeDicesTableGenerator } from '@main/factories';

export function makeDatabaseCreateDiceUsecase(): CreateDiceUsecase {
  const database = makeDatabase();
  const tableGenerator = makeDicesTableGenerator();

  return new DatabaseCreateDiceUsecase({ database, tableGenerator });
}
