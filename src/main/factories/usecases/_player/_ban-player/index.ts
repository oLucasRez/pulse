import { BanPlayerUsecase } from '@domain/usecases';

import { makeDAOBanPlayerUsecase } from './dao';

export function makeBanPlayerUsecase(): BanPlayerUsecase {
  return makeDAOBanPlayerUsecase();
}
