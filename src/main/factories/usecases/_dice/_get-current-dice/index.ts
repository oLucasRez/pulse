import { GetCurrentDiceUsecase } from '@domain/usecases';

import { makeDAOGetCurrentDiceUsecase } from './dao';

export function makeGetCurrentDiceUsecase(): GetCurrentDiceUsecase {
  return makeDAOGetCurrentDiceUsecase();
}
