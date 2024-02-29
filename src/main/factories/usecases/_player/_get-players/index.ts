import { GetPlayersUsecase } from '@domain/usecases';

import { makeCRUDGetPlayersUsecase } from './crud';

export function makeGetPlayersUsecase(): GetPlayersUsecase {
  return makeCRUDGetPlayersUsecase();
}
