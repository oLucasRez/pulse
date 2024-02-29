import { GetMeUsecase } from '@domain/usecases';

import { makeCRUDGetMeUsecase } from './crud';

export function makeGetMeUsecase(): GetMeUsecase {
  return makeCRUDGetMeUsecase();
}
