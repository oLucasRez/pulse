import { ChangePlayerUsecase } from '@domain/usecases';

import { makeDatabaseChangePlayerUsecase } from './database';

export function makeChangePlayerUsecase(): ChangePlayerUsecase {
  return makeDatabaseChangePlayerUsecase();
}
