import { GetCentralFactUsecase } from '@domain/usecases';

import { makeCRUDGetCentralFactUsecase } from './crud';

export function makeGetCentralFactUsecase(): GetCentralFactUsecase {
  return makeCRUDGetCentralFactUsecase();
}
