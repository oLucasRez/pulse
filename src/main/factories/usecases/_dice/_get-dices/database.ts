import { DatabaseGetDicesUsecase } from '@data/usecases';
import { GetDicesUsecase } from '@domain/usecases';

import { makeDatabase, makeDicesTableGenerator } from '@main/factories';

export function makeDatabaseGetDicesUsecase(): GetDicesUsecase {
  const database = makeDatabase();
  const tableGenerator = makeDicesTableGenerator();

  return new DatabaseGetDicesUsecase({ database, tableGenerator });
}
