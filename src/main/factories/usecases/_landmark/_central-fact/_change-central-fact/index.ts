import { ChangeCentralFactUsecase } from '@domain/usecases';

import { makeDAOChangeCentralFactUsecase } from './dao';

export function makeChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  return makeDAOChangeCentralFactUsecase();
}
