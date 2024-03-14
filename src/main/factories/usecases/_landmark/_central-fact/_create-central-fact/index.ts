import { CreateCentralFactUsecase } from '@domain/usecases';

import { makeDAOCreateCentralFactUsecase } from './dao';

export function makeCreateCentralFactUsecase(): CreateCentralFactUsecase {
  return makeDAOCreateCentralFactUsecase();
}
