import { GetGameUsecase } from '@domain/usecases';

import { makeDAOGetGameUsecase } from './crud';

export function makeGetGameUsecase(): GetGameUsecase {
  return makeDAOGetGameUsecase();
}
