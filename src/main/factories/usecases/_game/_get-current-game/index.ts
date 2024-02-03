import { GetCurrentGameUsecase } from '@domain/usecases';

import { makeMockGetCurrentGameUsecase } from './mock';

export function makeGetCurrentGameUsecase(): GetCurrentGameUsecase {
  return makeMockGetCurrentGameUsecase();
}
