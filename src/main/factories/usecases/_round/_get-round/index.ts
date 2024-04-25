import { IGetRoundUsecase } from '@domain/usecases';

import { GetRoundUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makeGetRoundUsecase(): IGetRoundUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new GetRoundUsecase({ getCurrentGame, roundDAO, roundHydrator });
}
