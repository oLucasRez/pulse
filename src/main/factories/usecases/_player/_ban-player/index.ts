import { BanPlayerUsecase } from '@domain/usecases';

import { makeDatabaseBanPlayerUsecase } from './database';

export function makeBanPlayerUsecase(): BanPlayerUsecase {
  return makeDatabaseBanPlayerUsecase();
}
