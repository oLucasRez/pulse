import { DatabaseCreateCentralPulseUsecase } from '@data/usecases';
import { CreateCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulsesTableGenerator,
  makeCreateCentralFactUsecase,
  makeFirebaseDatabase,
} from '@main/factories';

export function makeDatabaseCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const database = makeFirebaseDatabase();
  const createCentralFact = makeCreateCentralFactUsecase();

  return new DatabaseCreateCentralPulseUsecase({
    tableGenerator,
    database,
    createCentralFact,
  });
}
