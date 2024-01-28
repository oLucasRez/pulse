import { DatabaseGetDiceUsecase } from '@data/usecases';
import { GetDiceUsecase } from '@domain/usecases';

import { makeDicesTableGenerator, makeFirebaseDatabase } from '@main/factories';

export function makeDatabaseGetDiceUsecase(): GetDiceUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetDiceUsecase({ tableGenerator, database });
}
