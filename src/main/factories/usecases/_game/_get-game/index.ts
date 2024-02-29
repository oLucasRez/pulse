import { GetGameUsecase } from '@domain/usecases';

import { makeCRUDGetGameUsecase } from './crud';

export function makeGetGameUsecase(): GetGameUsecase {
  return makeCRUDGetGameUsecase();
}
