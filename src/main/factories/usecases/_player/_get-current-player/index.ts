import { IGetCurrentPlayerUsecase } from '@domain/usecases';

import { GetCurrentPlayerUsecase } from '@data/usecases';

import {
  makeGetRoundUsecase,
  makePlayerDAO,
  makePlayerHydrator,
} from '@main/factories';

export function makeGetCurrentPlayerUsecase(): IGetCurrentPlayerUsecase {
  const getRound = makeGetRoundUsecase();
  const playerDAO = makePlayerDAO();
  const playerHidrator = makePlayerHydrator();

  return new GetCurrentPlayerUsecase({ getRound, playerDAO, playerHidrator });
}
