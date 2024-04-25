import { IStartLightSpotRoundUsecase } from '@domain/usecases';

import { StartLightSpotRoundUsecase } from '@data/usecases';

import {
  makeGetLightSpotRoundUsecase,
  makeGetPlayersUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makeStartLightSpotRoundUsecase(): IStartLightSpotRoundUsecase {
  const getLightSpotRound = makeGetLightSpotRoundUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new StartLightSpotRoundUsecase({
    getLightSpotRound,
    getPlayers,
    roundDAO,
    roundHydrator,
  });
}
