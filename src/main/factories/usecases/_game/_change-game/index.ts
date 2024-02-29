import { ChangeGameUsecase } from '@domain/usecases';

import { makeCRUDChangeGameUsecase } from './crud';

export function makeChangeGameUsecase(): ChangeGameUsecase {
  return makeCRUDChangeGameUsecase();
}
