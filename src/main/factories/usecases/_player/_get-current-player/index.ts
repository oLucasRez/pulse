import { IGetCurrentPlayerUsecase } from '@domain/usecases';

import { GetCurrentPlayerUsecase } from '@data/usecases';

import { makeGetPlayerUsecase, makeGetRoundUsecase } from '@main/factories';

export function makeGetCurrentPlayerUsecase(): IGetCurrentPlayerUsecase {
  const getPlayer = makeGetPlayerUsecase();
  const getRound = makeGetRoundUsecase();

  return new GetCurrentPlayerUsecase({
    getPlayer,
    getRound,
  });
}
