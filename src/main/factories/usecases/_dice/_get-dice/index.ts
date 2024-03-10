import { GetDiceUsecase } from '@domain/usecases';

import { makeDAOGetDiceUsecase } from './crud';

export function makeGetDiceUsecase(): GetDiceUsecase {
  return makeDAOGetDiceUsecase();
}
