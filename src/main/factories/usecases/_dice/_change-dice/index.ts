import { ChangeDiceUsecase } from '@domain/usecases';

import { makeDAOChangeDiceUsecase } from './crud';

export function makeChangeDiceUsecase(): ChangeDiceUsecase {
  return makeDAOChangeDiceUsecase();
}
