import { CreateCentralFactUsecase } from '@domain/usecases';

import { makeDAOCreateCentralFactUsecase } from './crud';

export function makeCreateCentralFactUsecase(): CreateCentralFactUsecase {
  return makeDAOCreateCentralFactUsecase();
}
