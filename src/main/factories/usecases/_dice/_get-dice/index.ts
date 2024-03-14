import { GetDiceUsecase } from '@domain/usecases';

import { makeDAOGetDiceUsecase } from './dao';

export function makeGetDiceUsecase(): GetDiceUsecase {
  return makeDAOGetDiceUsecase();
}
