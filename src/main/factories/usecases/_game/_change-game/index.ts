import { ChangeGameUsecase } from '@domain/usecases';

import { makeDAOChangeGameUsecase } from './dao';

export function makeChangeGameUsecase(): ChangeGameUsecase {
  return makeDAOChangeGameUsecase();
}
