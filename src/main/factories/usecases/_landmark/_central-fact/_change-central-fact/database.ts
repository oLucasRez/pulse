import { DatabaseChangeCentralFactUsecase } from '@data/usecases';
import { ChangeCentralFactUsecase } from '@domain/usecases';

import {
  makeCentralFactsTableGeneratorDecorator,
  makeFirebaseDatabase,
  makeGetCentralFactUsecase,
} from '@main/factories';

export function makeDatabaseChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGeneratorDecorator();
  const database = makeFirebaseDatabase();
  const getCentralFact = makeGetCentralFactUsecase();

  return new DatabaseChangeCentralFactUsecase({
    tableGenerator,
    database,
    getCentralFact,
  });
}
