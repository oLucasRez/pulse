import { GetCentralFactUsecase } from '@domain/usecases';

import { makeDAOGetCentralFactUsecase } from './crud';

export function makeGetCentralFactUsecase(): GetCentralFactUsecase {
  return makeDAOGetCentralFactUsecase();
}
