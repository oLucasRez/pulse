import { DatabaseCreateCentralPulseUsecase } from '@data/usecases';
import { CreateCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulsesTableGenerator,
  makeCreateCentralFactUsecase,
  makeDatabase,
} from '@main/factories';

export function makeDatabaseCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const createCentralFact = makeCreateCentralFactUsecase();
  const database = makeDatabase();

  return new DatabaseCreateCentralPulseUsecase({
    tableGenerator,
    createCentralFact,
    database,
  });
}
