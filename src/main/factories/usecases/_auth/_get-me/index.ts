import { GetMeUsecase } from '@domain/usecases';

import { makeAuthGetMeUsecase } from './auth';

export function makeGetMeUsecase(): GetMeUsecase {
  return makeAuthGetMeUsecase();
}
