import { StartGameUsecase } from '@domain/usecases';

import { makeDAOStartGameUsecase } from './dao';

export function makeStartGameUsecase(): StartGameUsecase {
  return makeDAOStartGameUsecase();
}
