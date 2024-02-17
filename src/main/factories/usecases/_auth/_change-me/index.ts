import { ChangeMeUsecase } from '@domain/usecases';

import { makeDatabaseChangeMeUsecase } from './database';

export function makeChangeMeUsecase(): ChangeMeUsecase {
  return makeDatabaseChangeMeUsecase();
}
