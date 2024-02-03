import { GetDicesUsecase } from '@domain/usecases';

import { makeDatabaseGetDicesUsecase } from './database';

export function makeGetDicesUsecase(): GetDicesUsecase {
  return makeDatabaseGetDicesUsecase();
}
