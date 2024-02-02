import { DatabaseGetCentralFactUsecase } from '@data/usecases';
import { GetCentralFactUsecase } from '@domain/usecases';

import {
  makeCentralFactsTableGenerator,
  makeFirebaseDatabase,
} from '@main/factories';

export function makeDatabaseGetCentralFactUsecase(): GetCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetCentralFactUsecase({ tableGenerator, database });
}
