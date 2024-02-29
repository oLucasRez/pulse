import { CreatePlayerUsecase } from '@domain/usecases';

import { makeCRUDCreatePlayerUsecase } from './crud';

export function makeCreatePlayerUsecase(): CreatePlayerUsecase {
  return makeCRUDCreatePlayerUsecase();
}
