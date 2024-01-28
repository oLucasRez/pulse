import { DatabaseGetDicesUsecase } from '@data/usecases';
import { GetDicesUsecase } from '@domain/usecases';

import { makeDicesTableGenerator, makeFirebaseDatabase } from '@main/factories';

export function makeDatabaseGetDicesUsecase(): GetDicesUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetDicesUsecase({ tableGenerator, database });
}
