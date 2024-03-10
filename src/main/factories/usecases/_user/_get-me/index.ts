import { GetMeUsecase } from '@domain/usecases';

import { makeDAOGetMeUsecase } from './crud';

export function makeGetMeUsecase(): GetMeUsecase {
  return makeDAOGetMeUsecase();
}
