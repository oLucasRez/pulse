import { GetCentralFactUsecase } from '@domain/usecases';

import { makeDAOGetCentralFactUsecase } from './dao';

export function makeGetCentralFactUsecase(): GetCentralFactUsecase {
  return makeDAOGetCentralFactUsecase();
}
