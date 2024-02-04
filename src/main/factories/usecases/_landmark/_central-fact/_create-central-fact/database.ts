import { DatabaseCreateCentralFactUsecase } from '@data/usecases';
import { CreateCentralFactUsecase } from '@domain/usecases';

import { makeCentralFactsTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseCreateCentralFactUsecase(): CreateCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGenerator();
  const database = makeDatabase();

  return new DatabaseCreateCentralFactUsecase({
    tableGenerator,
    database,
  });
}
