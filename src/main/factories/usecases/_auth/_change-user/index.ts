import { ChangeUserUsecase } from '@domain/usecases';

import { makeDatabaseChangeUserUsecase } from './database';

export function makeChangeUserUsecase(): ChangeUserUsecase {
  return makeDatabaseChangeUserUsecase();
}
