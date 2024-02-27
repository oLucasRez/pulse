import { DatabaseCreateRoundUsecase } from '@data/usecases';
import { CreateRoundUsecase } from '@domain/usecases';

import { makeDatabase, makeRoundsTableGenerator } from '@main/factories';

export function makeDatabaseCreateRoundUsecase(): CreateRoundUsecase {
  const database = makeDatabase();
  const tableGenerator = makeRoundsTableGenerator();

  return new DatabaseCreateRoundUsecase({
    database,
    tableGenerator,
  });
}
