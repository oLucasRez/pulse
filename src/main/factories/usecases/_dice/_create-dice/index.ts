import { CreateDiceUsecase } from '@domain/usecases';

import { makeDAOCreateDiceUsecase } from './dao';

export function makeCreateDiceUsecase(): CreateDiceUsecase {
  return makeDAOCreateDiceUsecase();
}
