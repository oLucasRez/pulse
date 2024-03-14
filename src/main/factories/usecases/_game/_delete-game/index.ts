import { DeleteGameUsecase } from '@domain/usecases';

import { makeDAODeleteGameUsecase } from './dao';

export function makeDeleteGameUsecase(): DeleteGameUsecase {
  return makeDAODeleteGameUsecase();
}
