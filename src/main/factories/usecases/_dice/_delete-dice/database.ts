import { DatabaseDeleteDiceUsecase } from '@data/usecases';
import { DeleteDiceUsecase } from '@domain/usecases';

import { makeDicesTableGenerator, makeFirebaseDatabase } from '@main/factories';

export function makeDatabaseDeleteDiceUsecase(): DeleteDiceUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseDeleteDiceUsecase({ tableGenerator, database });
}
