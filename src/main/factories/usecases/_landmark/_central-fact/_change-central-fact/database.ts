import { DatabaseChangeCentralFactUsecase } from '@data/usecases';
import { ChangeCentralFactUsecase } from '@domain/usecases';

import {
  makeCentralFactsTableGeneratorDecorator,
  makeDatabaseGetCentralFactUsecase,
  makeFirebaseDatabase,
} from '@main/factories';

export function makeDatabaseChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGeneratorDecorator();
  const database = makeFirebaseDatabase();
  const getCentralFact = makeDatabaseGetCentralFactUsecase();

  return new DatabaseChangeCentralFactUsecase({
    tableGenerator,
    database,
    getCentralFact,
  });
}
