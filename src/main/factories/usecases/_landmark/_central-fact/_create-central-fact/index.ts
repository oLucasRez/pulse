import { CreateCentralFactUsecase } from '@domain/usecases';

import { makeDatabaseCreateCentralFactUsecase } from './database';

export function makeCreateCentralFactUsecase(): CreateCentralFactUsecase {
  return makeDatabaseCreateCentralFactUsecase();
}
