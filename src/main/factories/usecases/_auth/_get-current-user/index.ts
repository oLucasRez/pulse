import { GetCurrentUserUsecase } from '@domain/usecases';

import { makeMockGetCurrentUserUsecase } from './mock';

export function makeGetCurrentUserUsecase(): GetCurrentUserUsecase {
  return makeMockGetCurrentUserUsecase();
}
