import { GetGameUsecase } from '@domain/usecases';

import { makeDAOGetGameUsecase } from './dao';

export function makeGetGameUsecase(): GetGameUsecase {
  return makeDAOGetGameUsecase();
}
