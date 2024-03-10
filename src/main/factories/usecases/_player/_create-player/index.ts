import { CreatePlayerUsecase } from '@domain/usecases';

import { makeDAOCreatePlayerUsecase } from './crud';

export function makeCreatePlayerUsecase(): CreatePlayerUsecase {
  return makeDAOCreatePlayerUsecase();
}
