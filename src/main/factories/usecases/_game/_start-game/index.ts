import { StartGameUsecase } from '@domain/usecases';

import { makeCRUDStartGameUsecase } from './crud';

export function makeStartGameUsecase(): StartGameUsecase {
  return makeCRUDStartGameUsecase();
}
