import { ChangeCentralFactUsecase } from '@domain/usecases';

import { makeDAOChangeCentralFactUsecase } from './crud';

export function makeChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  return makeDAOChangeCentralFactUsecase();
}
