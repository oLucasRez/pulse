import { DatabaseGetRoundUsecase } from '@data/usecases';
import { GetRoundUsecase } from '@domain/usecases';

import { makeDatabase, makeRoundsTableGenerator } from '@main/factories';

export function makeDatabaseGetRoundUsecase(): GetRoundUsecase {
  const database = makeDatabase();
  const tableGenerator = makeRoundsTableGenerator();

  return new DatabaseGetRoundUsecase({ database, tableGenerator });
}
