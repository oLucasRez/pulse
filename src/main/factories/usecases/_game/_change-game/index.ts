import { ChangeGameUsecase } from '@domain/usecases';

import { makeDAOChangeGameUsecase } from './crud';

export function makeChangeGameUsecase(): ChangeGameUsecase {
  return makeDAOChangeGameUsecase();
}
