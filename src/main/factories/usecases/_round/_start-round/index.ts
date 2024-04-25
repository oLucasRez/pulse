import { IStartRoundUsecase } from '@domain/usecases';

import { StartRoundUsecase } from '@data/usecases';

import {
  makeGetPlayersUsecase,
  makeGetRoundUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makeStartRoundUsecase(): IStartRoundUsecase {
  const getPlayers = makeGetPlayersUsecase();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new StartRoundUsecase({
    getPlayers,
    getRound,
    roundDAO,
    roundHydrator,
  });
}
