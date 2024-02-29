import { CreateGameUsecase } from '@domain/usecases';

import { makeCRUDCreateGameUsecase } from './crud';

export function makeCreateGameUsecase(): CreateGameUsecase {
  return makeCRUDCreateGameUsecase();
}
