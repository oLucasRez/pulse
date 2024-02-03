import { ChangeDiceUsecase } from '@domain/usecases';

import { makeDatabaseChangeDiceUsecase } from './database';

export function makeChangeDiceUsecase(): ChangeDiceUsecase {
  return makeDatabaseChangeDiceUsecase();
}
