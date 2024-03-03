import { CRUDGetCurrentPlayerUsecase } from '@data/usecases';
import { GetCurrentPlayerUsecase } from '@domain/usecases';

import { makeGetPlayerUsecase, makeGetRoundUsecase } from '@main/factories';

export function makeCRUDGetCurrentPlayerUsecase(): GetCurrentPlayerUsecase {
  const getPlayer = makeGetPlayerUsecase();
  const getRound = makeGetRoundUsecase();

  return new CRUDGetCurrentPlayerUsecase({
    getPlayer,
    getRound,
  });
}
