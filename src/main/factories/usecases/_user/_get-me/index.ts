import { GetMeUsecase } from '@domain/usecases';

import { makeDAOGetMeUsecase } from './dao';

export function makeGetMeUsecase(): GetMeUsecase {
  return makeDAOGetMeUsecase();
}
