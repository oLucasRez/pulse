import { GetDicesUsecase } from '@domain/usecases';

import { makeDAOGetDicesUsecase } from './dao';

export function makeGetDicesUsecase(): GetDicesUsecase {
  return makeDAOGetDicesUsecase();
}
