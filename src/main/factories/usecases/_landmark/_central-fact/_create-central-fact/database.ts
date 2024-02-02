import { DatabaseCreateCentralFactUsecase } from '@data/usecases';
import { CreateCentralFactUsecase } from '@domain/usecases';

import {
  makeCentralFactsTableGenerator,
  makeFirebaseDatabase,
} from '@main/factories';

export function makeDatabaseCreateCentralFactUsecase(): CreateCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseCreateCentralFactUsecase({
    tableGenerator,
    database,
  });
}
