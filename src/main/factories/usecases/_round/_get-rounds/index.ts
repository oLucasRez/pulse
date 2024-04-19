import { IGetRoundsUsecase } from '@domain/usecases';

import { GetRoundsUsecase } from '@data/usecases';

import { makeRoundDAO, makeRoundHydrator } from '@main/factories';

export function makeGetRoundsUsecase(): IGetRoundsUsecase {
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new GetRoundsUsecase({
    roundDAO,
    roundHydrator,
  });
}
