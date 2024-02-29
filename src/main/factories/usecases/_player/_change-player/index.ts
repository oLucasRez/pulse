import { ChangePlayerUsecase } from '@domain/usecases';

import { makeCRUDChangePlayerUsecase } from './crud';

export function makeChangePlayerUsecase(): ChangePlayerUsecase {
  return makeCRUDChangePlayerUsecase();
}
