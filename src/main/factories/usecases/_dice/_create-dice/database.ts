import { DatabaseCreateDiceUsecase } from '@data/usecases';
import { CreateDiceUsecase } from '@domain/usecases';

import { makeDicesTableGenerator, makeFirebaseDatabase } from '@main/factories';

export function makeDatabaseCreateDiceUsecase(): CreateDiceUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseCreateDiceUsecase({ tableGenerator, database });
}
