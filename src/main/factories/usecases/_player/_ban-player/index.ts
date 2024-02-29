import { BanPlayerUsecase } from '@domain/usecases';

import { makeCRUDBanPlayerUsecase } from './crud';

export function makeBanPlayerUsecase(): BanPlayerUsecase {
  return makeCRUDBanPlayerUsecase();
}
