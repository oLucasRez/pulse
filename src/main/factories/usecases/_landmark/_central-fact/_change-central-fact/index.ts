import { ChangeCentralFactUsecase } from '@domain/usecases';

import { makeCRUDChangeCentralFactUsecase } from './crud';

export function makeChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  return makeCRUDChangeCentralFactUsecase();
}
