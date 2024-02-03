import { GetPlayersUsecase } from '@domain/usecases';

import { makeDatabaseGetPlayersUsecase } from './database';

export function makeGetPlayersUsecase(): GetPlayersUsecase {
  return makeDatabaseGetPlayersUsecase();
}
