import { IGetRoundUsecase } from '@domain/usecases';

import { GetRoundUsecase } from '@data/usecases';

import { makeRoundDAO, makeRoundHydrator } from '@main/factories';

export function makeGetRoundUsecase(): IGetRoundUsecase {
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new GetRoundUsecase({ roundDAO, roundHydrator });
}
