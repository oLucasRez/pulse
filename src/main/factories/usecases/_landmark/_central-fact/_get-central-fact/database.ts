import { DatabaseGetCentralFactUsecase } from '@data/usecases';
import { GetCentralFactUsecase } from '@domain/usecases';

import { makeCentralFactsTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseGetCentralFactUsecase(): GetCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGenerator();
  const database = makeDatabase();

  return new DatabaseGetCentralFactUsecase({ tableGenerator, database });
}
