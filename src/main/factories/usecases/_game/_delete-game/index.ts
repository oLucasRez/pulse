import { DeleteGameUsecase } from '@domain/usecases';

import { makeCRUDDeleteGameUsecase } from './crud';

export function makeDeleteGameUsecase(): DeleteGameUsecase {
  return makeCRUDDeleteGameUsecase();
}
