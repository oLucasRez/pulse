import { StartGameUsecase } from '@domain/usecases';

import { makeDAOStartGameUsecase } from './crud';

export function makeStartGameUsecase(): StartGameUsecase {
  return makeDAOStartGameUsecase();
}
