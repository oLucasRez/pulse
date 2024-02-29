import { CreateCentralFactUsecase } from '@domain/usecases';

import { makeCRUDCreateCentralFactUsecase } from './crud';

export function makeCreateCentralFactUsecase(): CreateCentralFactUsecase {
  return makeCRUDCreateCentralFactUsecase();
}
