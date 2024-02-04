import { DatabaseChangeCentralFactUsecase } from '@data/usecases';
import { ChangeCentralFactUsecase } from '@domain/usecases';

import {
  makeCentralFactsTableGeneratorDecorator,
  makeDatabase,
  makeGetCentralFactUsecase,
} from '@main/factories';

export function makeDatabaseChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGeneratorDecorator();
  const database = makeDatabase();
  const getCentralFact = makeGetCentralFactUsecase();

  return new DatabaseChangeCentralFactUsecase({
    tableGenerator,
    database,
    getCentralFact,
  });
}
