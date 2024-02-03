import { ChangeCentralFactUsecase } from '@domain/usecases';

import { makeDatabaseChangeCentralFactUsecase } from './database';

export function makeChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  return makeDatabaseChangeCentralFactUsecase();
}
