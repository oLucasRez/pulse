import { IStartRoundUsecase } from '@domain/usecases';

import { StartRoundUsecase } from '@data/usecases';

import {
  makeGetRoundUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makeStartRoundUsecase(): IStartRoundUsecase {
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new StartRoundUsecase({
    getRound,
    roundDAO,
    roundHydrator,
  });
}
