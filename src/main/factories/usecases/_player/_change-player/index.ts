import { ChangePlayerUsecase } from '@domain/usecases';

import { makeDAOChangePlayerUsecase } from './dao';

export function makeChangePlayerUsecase(): ChangePlayerUsecase {
  return makeDAOChangePlayerUsecase();
}
