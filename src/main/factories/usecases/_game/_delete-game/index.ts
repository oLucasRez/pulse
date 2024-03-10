import { DeleteGameUsecase } from '@domain/usecases';

import { makeDAODeleteGameUsecase } from './crud';

export function makeDeleteGameUsecase(): DeleteGameUsecase {
  return makeDAODeleteGameUsecase();
}
