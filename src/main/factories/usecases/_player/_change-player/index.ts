import { ChangePlayerUsecase } from '@domain/usecases';

import { makeDAOChangePlayerUsecase } from './crud';

export function makeChangePlayerUsecase(): ChangePlayerUsecase {
  return makeDAOChangePlayerUsecase();
}
