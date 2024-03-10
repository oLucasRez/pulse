import { CreateDiceUsecase } from '@domain/usecases';

import { makeDAOCreateDiceUsecase } from './crud';

export function makeCreateDiceUsecase(): CreateDiceUsecase {
  return makeDAOCreateDiceUsecase();
}
