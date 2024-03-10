import { BanPlayerUsecase } from '@domain/usecases';

import { makeDAOBanPlayerUsecase } from './crud';

export function makeBanPlayerUsecase(): BanPlayerUsecase {
  return makeDAOBanPlayerUsecase();
}
