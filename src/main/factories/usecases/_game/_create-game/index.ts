import { CreateGameUsecase } from '@domain/usecases';

import { makeDAOCreateGameUsecase } from './crud';

export function makeCreateGameUsecase(): CreateGameUsecase {
  return makeDAOCreateGameUsecase();
}
