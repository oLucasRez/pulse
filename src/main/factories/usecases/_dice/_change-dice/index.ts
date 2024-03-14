import { ChangeDiceUsecase } from '@domain/usecases';

import { makeDAOChangeDiceUsecase } from './dao';

export function makeChangeDiceUsecase(): ChangeDiceUsecase {
  return makeDAOChangeDiceUsecase();
}
