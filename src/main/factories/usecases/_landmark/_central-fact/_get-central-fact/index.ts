import { GetCentralFactUsecase } from '@domain/usecases';

import { makeDatabaseGetCentralFactUsecase } from './database';

export function makeGetCentralFactUsecase(): GetCentralFactUsecase {
  return makeDatabaseGetCentralFactUsecase();
}
