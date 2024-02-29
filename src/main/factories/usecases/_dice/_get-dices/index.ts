import { GetDicesUsecase } from '@domain/usecases';

import { makeCRUDGetDicesUsecase } from './crud';

export function makeGetDicesUsecase(): GetDicesUsecase {
  return makeCRUDGetDicesUsecase();
}
