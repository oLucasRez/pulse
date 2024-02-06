import { GetMeUsecase } from '@domain/usecases';

import { makeMockGetMeUsecase } from './mock';

export function makeGetMeUsecase(): GetMeUsecase {
  return makeMockGetMeUsecase();
}
