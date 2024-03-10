import { GetDicesUsecase } from '@domain/usecases';

import { makeDAOGetDicesUsecase } from './crud';

export function makeGetDicesUsecase(): GetDicesUsecase {
  return makeDAOGetDicesUsecase();
}
