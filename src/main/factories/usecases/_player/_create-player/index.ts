import { CreatePlayerUsecase } from '@domain/usecases';

import { makeDatabaseCreatePlayerUsecase } from './database';

export function makeCreatePlayerUsecase(): CreatePlayerUsecase {
  return makeDatabaseCreatePlayerUsecase();
}
