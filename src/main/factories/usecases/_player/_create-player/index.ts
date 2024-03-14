import { CreatePlayerUsecase } from '@domain/usecases';

import { makeDAOCreatePlayerUsecase } from './dao';

export function makeCreatePlayerUsecase(): CreatePlayerUsecase {
  return makeDAOCreatePlayerUsecase();
}
