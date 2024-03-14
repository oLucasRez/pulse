import { CreateGameUsecase } from '@domain/usecases';

import { makeDAOCreateGameUsecase } from './dao';

export function makeCreateGameUsecase(): CreateGameUsecase {
  return makeDAOCreateGameUsecase();
}
